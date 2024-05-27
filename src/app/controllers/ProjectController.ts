import { Request, Response, Router } from "express";
import { ProjectRepository } from "../repositories/ProjectRepository";

export class ProjectController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/", this.getAllProjects);
    this.router.post("/", this.createProject);
    this.router.get("/:id", this.getProject);
    this.router.delete("/:id", this.deleteProject);
  }

  private async getAllProjects(req: Request, res: Response) {
    const projects = await ProjectRepository.getAProjects();
    res.status(200).json(projects);
  }

  private async createProject(req: Request, res: Response) {
    const { body } = req;
    const projectCreated = await ProjectRepository.newProject(body);
    return res.status(201).json(projectCreated);
  }

  private async getProject(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const project = await ProjectRepository.getAProject(id);
    return res.status(200).json(project);
  }

  private async deleteProject(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const projectDeleted = await ProjectRepository.removeProject(id);
    return res.status(200).json({ message: projectDeleted });
  }
}

export const projectRouter = new ProjectController().router;
