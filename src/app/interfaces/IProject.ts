export interface IProjectInput {
  name: string;
  description: string;
  start_at: Date;
  end_at: Date;
  active?: boolean;
}

export interface IProjectOutput {
  id: number;
  description: string;
  start_at: Date;
  end_at: Date;
  active?: boolean;
}
