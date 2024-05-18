import { MigrationInterface } from "typeorm";
import { AppDataSource } from "../dataSource";
import { userSeed } from "../seeders/UserSeed";

export class CreateSeedUsersTable1716052161507 implements MigrationInterface {
  public async up(): Promise<void> {
    const usersRepository = AppDataSource.getRepository("User");
    await usersRepository.save(userSeed);
  }

  public async down(): Promise<void> {}
}
