"use server";
import { ChildProcess, spawn } from "node:child_process";

type QemuMachineType = "pc" | "q35,accel=hvf" | "virt,accel=hvf";
type QemuArch = "x86_64" | "arm" | "aarch64";

interface QemuOptions {
  machine?: QemuMachineType;
  memory?: number;
  cpus?: number | "host";
  drives?: string[];
  extraArgs?: string[];
}

export default class Qemu {
  private options: QemuOptions = { drives: [], extraArgs: [] };

  constructor(private arch: QemuArch = "x86_64") {}

  static create(arch?: QemuArch) {
    return new Qemu(arch);
  }

  createMachine(type: QemuMachineType) {
    this.options.machine = type;
    return this;
  }

  createQ35WithHVF() {
    this.options.machine = "q35,accel=hvf";
    return this;
  }

  createVirtWithHVF() {
    this.options.machine = "virt,accel=hvf";
    return this;
  }

  memory(mb: number) {
    this.options.memory = mb;
    return this;
  }

  cpu(count: number | "host") {
    this.options.cpus = count;
    return this;
  }

  drive(path: string) {
    this.options.drives?.push(path);
    return this;
  }

  extraArg(arg: string) {
    this.options.extraArgs?.push(arg);
    return this;
  }

  run(): ChildProcess {
    const args: string[] = [];

    if (this.options.machine) args.push("-machine", this.options.machine);
    if (this.options.memory) args.push("-m", this.options.memory.toString());
    if (this.options.cpus) args.push("-smp", this.options.cpus.toString());

    this.options.drives?.forEach((drive) => {
      args.push("-drive", `file=${drive},format=qcow2`);
    });

    if (this.options.extraArgs) args.push(...this.options.extraArgs);

    console.log("Spawning qemu with args:", args.join(" "));
    const qemuProcess = spawn(`qemu-system-${this.arch}`, args, {
      stdio: "inherit",
    });
    console.log(qemuProcess);
    // TODO: stop the process
    // qemuProcess.unref();
    return qemuProcess;
  }
}
