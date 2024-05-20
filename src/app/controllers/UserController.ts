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
    this.router.put("/:id", this.updateUser);
    this.router.delete("/:id", this.deleteUser);
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
    return res.status(200).json(user);
  }

  private async updateUser(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const userUpdated = await UserRepository.updateUser(id, req.body);
    return res.status(201).json({ message: userUpdated });
  }

  private async deleteUser(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const userDeleted = await UserRepository.delete(id);
    return res.status(200).json({ message: userDeleted });
  }
}

export const userRouter = new UserController().router;
