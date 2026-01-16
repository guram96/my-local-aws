"use server";
import net from "net";
import { execSync } from "node:child_process";
import path from "node:path";

export interface RunningQemuInstance {
  pid: number;
  image: string;
  qmpSocket?: string;
  status?: string;
}

export async function checkQemuAction(): Promise<{
  success: boolean;
  instances?: RunningQemuInstance[];
  error?: string;
}> {
  try {
    // Find all running QEMU processes
    const qemuProcesses = findRunningQemuProcesses();

    if (qemuProcesses.length === 0) {
      return { success: true, instances: [] };
    }

    // Get details for each running instance
    const instances: RunningQemuInstance[] = [];

    for (const proc of qemuProcesses) {
      const instance: RunningQemuInstance = {
        pid: proc.pid,
        image: proc.image,
        qmpSocket: proc.qmpSocket,
      };

      // Try to get status from QMP socket if available
      if (proc.qmpSocket) {
        try {
          const status = await getQemuStatus(proc.qmpSocket);
          instance.status = status;
        } catch {
          // QMP socket might not be accessible, continue without status
        }
      }

      instances.push(instance);
    }

    return { success: true, instances };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to check QEMU instances";
    return { success: false, error: errorMessage };
  }
}

function findRunningQemuProcesses(): Array<{
  pid: number;
  image: string;
  qmpSocket?: string;
}> {
  try {
    // Find all QEMU processes (qemu-system-x86_64, qemu-system-aarch64, etc.)
    const psOutput = execSync(
      "ps aux | grep -E 'qemu-system-(x86_64|aarch64)' | grep -v grep",
      { encoding: "utf-8" }
    );

    const processes: Array<{ pid: number; image: string; qmpSocket?: string }> =
      [];
    const lines = psOutput
      .trim()
      .split("\n")
      .filter((line) => line.trim());

    for (const line of lines) {
      const parts = line.trim().split(/\s+/);
      const pid = parseInt(parts[1], 10);
      if (isNaN(pid)) continue;

      // Extract command line arguments
      const cmdLine = line.substring(line.indexOf(parts[10]) || 0);

      // Extract image file from -drive file=... argument
      const driveMatch = cmdLine.match(/-drive\s+file=([^\s,]+)/);
      const image = driveMatch ? path.basename(driveMatch[1]) : "unknown";

      // Extract QMP socket from -qmp unix:... argument
      const qmpMatch = cmdLine.match(/-qmp\s+unix:([^\s,]+)/);
      const qmpSocket = qmpMatch ? qmpMatch[1] : undefined;

      processes.push({ pid, image, qmpSocket });
    }

    return processes;
  } catch {
    // If ps command fails or no processes found, return empty array
    return [];
  }
}

function getQemuStatus(qmpSocket: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const client = net.createConnection(qmpSocket);

    let buffer = "";
    let statusResolved = false;

    const timeout = setTimeout(() => {
      if (!statusResolved) {
        statusResolved = true;
        client.destroy();
        reject(new Error("QMP connection timeout"));
      }
    }, 2000);

    client.on("data", (data) => {
      buffer += data.toString();

      if (buffer.includes("QMP")) {
        // Step 1: Enable capabilities
        client.write(JSON.stringify({ execute: "qmp_capabilities" }) + "\n");
        // Step 2: Query status
        client.write(JSON.stringify({ execute: "query-status" }) + "\n");
      }

      try {
        const messages = buffer.split("\n").filter((m) => m.trim() !== "");

        for (const msg of messages) {
          const parsed = JSON.parse(msg);
          if (parsed.return && parsed.return.status) {
            if (!statusResolved) {
              statusResolved = true;
              clearTimeout(timeout);
              client.end();
              resolve(parsed.return.status);
            }
          }
        }
      } catch {
        // incomplete JSON message, wait for more data
      }
    });

    client.on("error", (err) => {
      if (!statusResolved) {
        statusResolved = true;
        clearTimeout(timeout);
        reject(err);
      }
    });

    client.on("end", () => {
      if (!statusResolved) {
        statusResolved = true;
        clearTimeout(timeout);
        reject(new Error("Connection closed before status received"));
      }
    });
  });
}
