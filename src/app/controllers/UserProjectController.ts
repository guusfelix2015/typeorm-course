import { Request, Response, Router } from "express";
import { UserProjectRepository } from "../repositories/UserProjectRepository";

export class UserProjectController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/", this.getUsersProjects);
    this.router.post("/", this.createUserProject);
    this.router.get("/:id", this.getUserProject);
    this.router.put("/:id", this.updateUserProject);
    this.router.delete("/:id", this.deleteUserProject);
  }

  private async getUsersProjects(req: Request, res: Response) {
    const usersProjects = await UserProjectRepository.getUsersProjects();
    res.status(200).json(usersProjects);
  }

  private async createUserProject(req: Request, res: Response) {
    const { body } = req;
    const userProjectCreated = await UserProjectRepository.newUserProject(body);
    return res.status(201).json(userProjectCreated);
  }

  private async getUserProject(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const userProject = await UserProjectRepository.getAUserProject(id);
    return res.status(200).json(userProject);
  }

  private async updateUserProject(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const userProjectUpdated = await UserProjectRepository.updateUserProject(
      id,
      req.body,
    );
    return res.status(201).json({ message: userProjectUpdated });
  }

  private async deleteUserProject(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const userProjectDeleted =
      await UserProjectRepository.removeUserProject(id);
    return res.status(200).json({ message: userProjectDeleted });
  }
}

export const userProjectRouter = new UserProjectController().router;
