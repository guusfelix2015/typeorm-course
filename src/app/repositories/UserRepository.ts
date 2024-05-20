import { User } from "../entities/User";
import { AppDataSource } from "../../database/dataSource";
import { IUserInput, IUserOutput } from "../interfaces/IUser";

export class UserRepository {
  private static usersRepository = AppDataSource.getRepository(User);

  static async getUsers() {
    return this.usersRepository.find();
  }

  static async newUser(user: IUserInput): Promise<IUserOutput> {
    const createdUser = await this.usersRepository.save(user);
    return createdUser;
  }
}
