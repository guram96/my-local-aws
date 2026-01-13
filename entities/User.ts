import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 255, unique: true })
  email!: string;

  @Column({ type: "varchar", length: 255 })
  password!: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  firstName?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  lastName?: string;

  @Column({ type: "boolean", default: false })
  emailVerified!: boolean;

  @Column({ type: "varchar", length: 255, nullable: true })
  verificationToken?: string;

  @Column({ type: "datetime", nullable: true })
  verificationTokenExpiry?: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
