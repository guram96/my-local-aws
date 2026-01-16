"use server";
import { execSync, spawn } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";

export async function runQemuAction(): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    const HOME_DIR = os.homedir();
    const ARCH = os.arch();
    const QEMU_IMAGE = path.join(process.cwd(), "al2023.qcow2");
    const CLOUD_ISO = path.join(process.cwd(), "seed.iso");
    const SEED_DIR = path.join(process.cwd(), "seed");
    const USER_NAME = "ec2-user";
    const SSH_KEY = path.join(HOME_DIR, ".ssh/id_ed25519.pub"); // TODO: add feature to create new public keys
    const MEMORY = 1024; // 1GB
    const CPUS = 1; // 1 vCPU

    let AMI_URL: string;
    let QEMU_BIN: string;

    if (ARCH === "x64") {
      AMI_URL =
        "https://cdn.amazonlinux.com/os-images/2.x/latest/x86_64/al2023.qcow2";
      QEMU_BIN = "qemu-system-x86_64";
    } else if (ARCH === "arm64") {
      AMI_URL =
        "https://cdn.amazonlinux.com/os-images/2.x/latest/arm64/al2023.qcow2";
      QEMU_BIN = "qemu-system-aarch64";
    } else {
      return { success: false, error: `Unsupported architecture: ${ARCH}` };
    }

    // 1️⃣ Download Amazon Linux image if missing
    if (!existsSync(QEMU_IMAGE)) {
      execSync(`curl -LO ${AMI_URL}`, { stdio: "inherit" });
    }

    // 2️⃣ Create cloud-init seed directory
    mkdirSync(SEED_DIR, { recursive: true });

    // meta-data
    writeFileSync(
      path.join(SEED_DIR, "meta-data"),
      `instance-id: i-local123\nlocal-hostname: al2023-local\n`
    );

    // user-data
    const sshPubKey = execSync(`cat ${SSH_KEY}`).toString().trim();
    const userData = `#cloud-config
users:
  - default
  - name: ${USER_NAME}
    sudo: ALL=(ALL) NOPASSWD:ALL
    ssh_authorized_keys:
      - ${sshPubKey}
ssh_pwauth: false
disable_root: false
chpasswd:
  list: |
     root:ec2root
  expire: false
`;
    writeFileSync(path.join(SEED_DIR, "user-data"), userData);

    // 3️⃣ Create cloud-init ISO
    execSync(
      `mkisofs -output ${CLOUD_ISO} -volid cidata -joliet -rock ${SEED_DIR}/user-data ${SEED_DIR}/meta-data`,
      { stdio: "inherit" }
    );

    // 4️⃣ Launch QEMU
    const qemuArgs =
      ARCH === "x64"
        ? [
            "-machine",
            "q35,accel=hvf",
            "-cpu",
            "host",
            "-smp",
            CPUS.toString(),
            "-m",
            MEMORY.toString(),
            "-drive",
            `file=${QEMU_IMAGE},if=virtio`,
            "-cdrom",
            CLOUD_ISO,
            "-netdev",
            "user,id=net0,hostfwd=tcp::2222-:22",
            "-device",
            "virtio-net-pci,netdev=net0",
            "-qmp",
            "unix:/tmp/qmp-sock,server,nowait",
            "-nographic",
          ]
        : [
            "-machine",
            "virt,accel=hvf",
            "-cpu",
            "host",
            "-smp",
            CPUS.toString(),
            "-m",
            MEMORY.toString(),
            "-drive",
            `file=${QEMU_IMAGE},if=virtio`,
            "-cdrom",
            CLOUD_ISO,
            "-netdev",
            "user,id=net0,hostfwd=tcp::2222-:22",
            "-device",
            "virtio-net-device,netdev=net0",
            "-qmp",
            "unix:/tmp/qmp-sock,server,nowait",
            "-nographic",
          ];

    // Spawn QEMU in background
    const qemuProcess = spawn(QEMU_BIN, qemuArgs, {
      stdio: "inherit",
      detached: true,
    });
    qemuProcess.unref();

    return { success: true };
  } catch (error) {
    console.error(error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to run QEMU";
    console.error("Error running QEMU:", error);
    return { success: false, error: errorMessage };
  }
}
