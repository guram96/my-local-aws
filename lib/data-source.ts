import { User } from "@/entities/User";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Ec2Instance } from "../entities/Ec2Instance";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true, // Set to false in production
  logging: false,
  entities: [User, Ec2Instance],
  migrations: [],
  subscribers: [],
});
