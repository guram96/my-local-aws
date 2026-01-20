import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("ec2_instances")
export class Ec2Instance {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", enum: ["t2.micro", "t3.micro", "t3a.micro"] })
  type!: string;

  @Column({ type: "varchar", length: 255 })
  name!: string;

  @Column()
  memory!: number;

  @Column({ type: "integer", nullable: true })
  cpu?: number;

  @Column({ type: "integer", nullable: true })
  vCpu?: number;

  @Column({
    type: "varchar",
    enum: ["EBS Only", "Instance Store"],
    nullable: true,
  })
  storageType?: "EBS Only" | "Instance Store";

  @Column({
    type: "varchar",
    enum: ["General purpose", "Compute", "Memory", "Storage"],
    nullable: true,
  })
  family?: "General purpose" | "Compute" | "Memory" | "Storage";
}
