export interface IUserInput {
  name: string;
  email: string;
  password: string;
  birth_date: Date;
  active: boolean;
}

export interface IUserOutput extends IUserInput {
  id: number;
}
