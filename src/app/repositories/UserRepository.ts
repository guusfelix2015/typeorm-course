import { User } from "../entities/User";
import { AppDataSource } from "../../database/dataSource";
import { IUserInput, IUserOutput } from "../interfaces/IUser";
import { ErrorExtension } from "../utils/ErrorExtension";

export class UserRepository {
  private static usersRepository = AppDataSource.getRepository(User);

  static async getUsers(): Promise<IUserOutput[]> {
    return this.usersRepository.find();
  }

  static async newUser(user: IUserInput): Promise<IUserOutput> {
    const createdUser = await this.usersRepository.save(user);
    return createdUser;
  }

  static async getUser(id: number): Promise<IUserOutput | null> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new ErrorExtension("User not found", 404);
    }

    return user;
  }
}
