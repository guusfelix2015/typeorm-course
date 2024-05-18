import "reflect-metadata";
import { DataSource } from "typeorm";
import { CreateUsersTable1716046496279 } from "./migrations/1716046496279-CreateUsersTable";
import { CreateSeedUsersTable1716052161507 } from "./migrations/1716052161507-CreateSeedUsersTable";

import { User } from "../app/entities/User";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "root",
  database: "curso_typeorm",
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [
    CreateUsersTable1716046496279,
    CreateSeedUsersTable1716052161507,
  ],
  subscribers: [],
});
