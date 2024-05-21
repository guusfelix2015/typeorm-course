import { Request, Response, NextFunction } from "express";
import { Auth } from "../utils/Auth";

export const authenticateMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization || "";
  const auth = new Auth();
  auth.AuthenticationToken(token);

  next();
};
