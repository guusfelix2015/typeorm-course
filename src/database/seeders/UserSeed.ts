import { IUserInput } from "../../app/interfaces/IUser";

export const userSeed: IUserInput = {
  name: "admin",
  email: "admin@admin.com",
  password: "admin",
  birth_date: new Date("1990-01-01"),
  active: true,
};
