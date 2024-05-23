import "reflect-metadata";
import { DataSource } from "typeorm";
import { CreateUsersTable1716046496279 } from "./migrations/1716046496279-CreateUsersTable";
import { CreateSeedUsersTable1716052161507 } from "./migrations/1716052161507-CreateSeedUsersTable";
import { CreateAddressTable1716322566903 } from "./migrations/1716322566903-CreateAddressTable";

import { User } from "../app/entities/User";
import { Address } from "../app/entities/Address";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "root",
  database: "curso_typeorm",
  synchronize: true,
  logging: false,
  entities: [User, Address],
  migrations: [
    CreateUsersTable1716046496279,
    CreateSeedUsersTable1716052161507,
    CreateAddressTable1716322566903,
  ],
  subscribers: [],
});
