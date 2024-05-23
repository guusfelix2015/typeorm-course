export interface IAddressInput {
  street: string;
  city: string;
  state: string;
  user_id: number;
}

export interface IAddressOutput {
  id: number;
  street: string;
  city: string;
  state: string;
  user_id: number;
}
