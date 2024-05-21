import jwt, { SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";
import { ITokenData } from "../interfaces/ILogin";
import { ErrorExtension } from "./ErrorExtension";

dotenv.config();

const secret = process.env.JWT_SECRET as string;

const jwtDefaultConfig: SignOptions = {
  algorithm: "HS256",
  expiresIn: "1h",
};

export class Auth {
  constructor(private jwtConfig?: SignOptions) {
    if (!jwtConfig) {
      this.jwtConfig = jwtDefaultConfig;
    }
  }

  public JwtGenerator(payload: ITokenData) {
    return jwt.sign(payload, secret, this.jwtConfig);
  }

  public AuthenticationToken(token: string) {
    if (!token) {
      throw new ErrorExtension("Token not found", 401);
    }

    try {
      const validateJwt = jwt.verify(token, secret, this.jwtConfig);
      return validateJwt;
    } catch (error) {
      throw new ErrorExtension("Invalid token", 401);
    }
  }
}
