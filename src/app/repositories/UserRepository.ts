import { User } from "../entities/User";
import { AppDataSource } from "../../database/dataSource";

export class UserRepository {
  private static usersRepository = AppDataSource.getRepository(User);

  static async getUsers() {
    return this.usersRepository.find();
  }
}
