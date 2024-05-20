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
    this.router.get("/:id", this.getUser);
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

  private async getUser(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const user = await UserRepository.getUser(id);
    res.status(200).json(user);
  }
}

export const userRouter = new UserController().router;
