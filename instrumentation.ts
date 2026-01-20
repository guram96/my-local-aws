import { Ec2Instance } from "./entities/Ec2Instance";
import { initializeDatabase } from "./lib/db";

export async function register() {
  const appDataSource = await initializeDatabase();
  const ec2InstanceRepository = appDataSource.getRepository(Ec2Instance);
  const newEc2Instance = new Ec2Instance();

  newEc2Instance.type = "t3.micro";
  newEc2Instance.name = "T3 Micro";
  newEc2Instance.memory = 1024;
  newEc2Instance.cpu = 0;
  newEc2Instance.vCpu = 2;
  newEc2Instance.storageType = "EBS Only";
  newEc2Instance.family = "General purpose";

  // await ec2InstanceRepository.save(newEc2Instance);
}
