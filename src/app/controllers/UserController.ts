import { Request, Response, Router } from "express";
import { UserRepository } from "../repositories/UserRepository";

export class UserController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/", this.getAllUsers);
  }

  private async getAllUsers(req: Request, res: Response) {
    const user = await UserRepository.getUsers();
    res.status(200).json(user);
  }
}

export const userRouter = new UserController().router;
