import "reflect-metadata";
import { DataSource } from "typeorm";
import { CreateUsersTable1716046496279 } from "./migrations/1716046496279-CreateUsersTable";
import { CreateAddressTable1716322566903 } from "./migrations/1716322566903-CreateAddressTable";
import { CreateProjectTable1716493455943 } from "./migrations/1716493455943-CreateProjectTable";
import { CreateUserProject1716493475456 } from "./migrations/1716493475456-CreateUserProject";
import dotenv from "dotenv";

dotenv.config();

import { User } from "../app/entities/User";
import { Address } from "../app/entities/Address";
import { Project } from "../app/entities/Project";
import { UserProject } from "../app/entities/UserProject";
import { CreateSeedUsersTable1716052161507 } from "./migrations/1716052161507-CreateSeedUsersTable";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOSTNAME,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: true,
  logger: "file",
  ssl: true,
  entities: [User, Address, Project, UserProject],
  migrations: [
    CreateUsersTable1716046496279,
    CreateSeedUsersTable1716052161507,
    CreateAddressTable1716322566903,
    CreateProjectTable1716493455943,
    CreateUserProject1716493475456,
  ],
  subscribers: [],
});
