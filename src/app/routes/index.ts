import { Router } from "express";
import { userRouter } from "../controllers/UserController";

export const routers = Router();

routers.use("/users", userRouter);
