export interface IUserInput {
  name: string;
  email: string;
  password: string;
  birth_date: Date;
  active: boolean;
}

export interface IUserOutput {
  id: number;
  name: string;
  email: string;
  password?: string;
  birth_date: Date;
  active: boolean;
}
