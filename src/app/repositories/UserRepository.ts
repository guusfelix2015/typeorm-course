import { User } from "../entities/User";
import { AppDataSource } from "../../database/dataSource";
import { IUserInput, IUserOutput } from "../interfaces/IUser";
import { ErrorExtension } from "../utils/ErrorExtension";
import { userSchemaValidation } from "../utils/validations/userSchemaValidation";

export class UserRepository {
  private static usersRepository = AppDataSource.getRepository(User);

  static async getUsers(): Promise<IUserOutput[]> {
    return this.usersRepository.find();
  }

  static async newUser(user: IUserInput): Promise<IUserOutput> {
    const { error } = userSchemaValidation.validate(user, {
      abortEarly: false,
    });

    if (error) {
      const validateErrors = error.details.map((err) => err.message);
      throw new ErrorExtension(validateErrors.join(", "), 400);
    }

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

  static async updateUser(
    id: number,
    user: IUserInput,
  ): Promise<string | null> {
    const userExists = await this.usersRepository.findOneBy({ id });

    if (!userExists) {
      throw new ErrorExtension("User not found", 404);
    }

    await this.usersRepository.update(id, user);

    return "User updated";
  }

  static async delete(id: number): Promise<string | null> {
    const userExists = await this.usersRepository.findOneBy({ id });

    if (!userExists) {
      throw new ErrorExtension("User not found", 404);
    }

    await this.usersRepository.delete(id);

    return "User deelted";
  }
}
