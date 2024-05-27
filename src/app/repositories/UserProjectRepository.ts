import { ValidationErrorItem } from "joi";
import { UserProject } from "../entities/UserProject";
import { AppDataSource } from "../../database/dataSource";
import { ErrorExtension } from "../utils/ErrorExtension";
import userProjectValidation from "../utils/validations/userProjectSchemaValidation";
import {
  IUserProjectInput,
  IUserProjectOutput,
} from "../interfaces/IUserProject";
export class UserProjectRepository {
  private static userProjectRepository =
    AppDataSource.getRepository(UserProject);

  static async getUsersProjects(): Promise<IUserProjectOutput[]> {
    return this.userProjectRepository.find();
  }

  static async newUserProject(
    userProject: IUserProjectInput,
  ): Promise<IUserProjectOutput> {
    const { error } = userProjectValidation.validate(userProject, {
      abortEarly: false,
    });

    if (error) {
      const validateErrors = error.details.map(
        (detail: ValidationErrorItem) => detail.message,
      );
      throw new ErrorExtension(validateErrors.join(","), 400);
    }

    return this.userProjectRepository.save(userProject);
  }

  static async getAUserProject(id: number): Promise<IUserProjectOutput | null> {
    const userproject = this.userProjectRepository.findOneBy({ id });

    if (!userproject) {
      throw new ErrorExtension("Userproject not found", 404);
    }
    return userproject;
  }

  static async updateUserProject(
    id: number,
    userProject: IUserProjectInput,
  ): Promise<string | null> {
    const userProjectExists = await this.userProjectRepository.findOneBy({
      id,
    });

    if (!userProjectExists) {
      throw new ErrorExtension("User not found", 404);
    }

    await this.userProjectRepository.update(id, userProject);

    return "UserProject updated";
  }

  static async removeUserProject(id: number): Promise<string> {
    await this.userProjectRepository.delete(id);
    return "Project removed successfully";
  }
}
