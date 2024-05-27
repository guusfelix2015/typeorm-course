import { ValidationErrorItem } from "joi";
import { Project } from "../entities/Project";
import { AppDataSource } from "../../database/dataSource";
import { ErrorExtension } from "../utils/ErrorExtension";
import projectSchemaValidation from "../utils/validations/projectSchemaValidation";
import { IProjectInput, IProjectOutput } from "../interfaces/IProject";

export class ProjectRepository {
  private static projectRepository = AppDataSource.getRepository(Project);

  static async getAProjects(): Promise<IProjectOutput[]> {
    return this.projectRepository.find();
  }

  static async newProject(project: IProjectInput): Promise<IProjectOutput> {
    const { error } = projectSchemaValidation.validate(project, {
      abortEarly: false,
    });

    if (error) {
      const validateErrors = error.details.map(
        (detail: ValidationErrorItem) => detail.message,
      );
      throw new ErrorExtension(validateErrors.join(","), 400);
    }
    return this.projectRepository.save(project);
  }

  static async getAProject(id: number): Promise<IProjectOutput | null> {
    const project = this.projectRepository.findOneBy({ id });

    if (!project) {
      throw new ErrorExtension("Project not found", 404);
    }
    return project;
  }

  static async removeProject(id: number): Promise<string> {
    await this.projectRepository.delete(id);
    return "Project removed successfully";
  }
}
