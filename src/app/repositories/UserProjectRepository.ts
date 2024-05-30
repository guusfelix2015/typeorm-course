import { ValidationErrorItem } from "joi";
import { UserProject } from "../entities/UserProject";
import { AppDataSource } from "../../database/dataSource";
import { ErrorExtension } from "../utils/ErrorExtension";
import userProjectValidation from "../utils/validations/userProjectSchemaValidation";

import {
  IUserProjectInput,
  IUserProjectOutput,
} from "../interfaces/IUserProject";
import { IProjectInput } from "../interfaces/IProject";
import { User } from "../entities/User";
import { IUserInput, IUserOutput } from "../interfaces/IUser";
import { Project } from "../entities/Project";
export class UserProjectRepository {
  private static userProjectRepository =
    AppDataSource.getRepository(UserProject);

  static async getUsersProjects(): Promise<IUserProjectOutput[]> {
    return this.userProjectRepository.find({
      relations: ["users", "projects"],
    });
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

  static async createAll(data: {
    user: IUserInput;
    project: IProjectInput;
    user_project: IUserProjectInput;
  }): Promise<{
    user: IUserOutput;
    project: IProjectInput;
    user_project: IUserProjectOutput;
  }> {
    const createdData = await AppDataSource.transaction(
      async (transactionalEntityManager) => {
        const user = await transactionalEntityManager.save(User, data.user);
        const project = await transactionalEntityManager.save(
          Project,
          data.project,
        );
        const userProject = await transactionalEntityManager.save(UserProject, {
          hours_worked: data.user_project.hours_worked,
          user_id: user.id,
          project_id: project.id,
        });
        return { user, project, user_project: userProject };
      },
    );
    return createdData;
  }
}
