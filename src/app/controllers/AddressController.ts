import { Request, Response, Router } from "express";
import { AddresRepository } from "../repositories/AddressRepository";

export class AddressController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/", this.getAllAddress);
    this.router.post("/", this.createAddress);
    this.router.delete("/:id", this.deleteAddress);
  }

  private async getAllAddress(req: Request, res: Response) {
    const address = await AddresRepository.getAddress();
    res.status(200).json(address);
  }

  private async createAddress(req: Request, res: Response) {
    const { body } = req;
    const addressCreated = await AddresRepository.newAddress(body);
    return res.status(201).json(addressCreated);
  }

  private async deleteAddress(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const addressDeleted = await AddresRepository.removeAddress(id);
    return res.status(200).json({ message: addressDeleted });
  }
}

export const addressRouter = new AddressController().router;
