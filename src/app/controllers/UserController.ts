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
    this.router.post("/", this.createUser);
  }

  private async getAllUsers(req: Request, res: Response) {
    const user = await UserRepository.getUsers();
    res.status(200).json(user);
  }

  private async createUser(req: Request, res: Response) {
    const { body } = req;
    const userCreated = await UserRepository.newUser(body);
    return res.status(201).json(userCreated);
  }
}

export const userRouter = new UserController().router;
