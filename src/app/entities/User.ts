import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
} from "typeorm";
import { Address } from "./Address";
import { UserProject } from "./UserProject";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("varchar", { nullable: false, length: 100 })
  name: string;

  @Index("email-idx", { unique: true })
  @Column("varchar", { nullable: false, length: 100, unique: true })
  email: string;

  @Column("varchar", { nullable: false })
  password: string;

  @Column("date", { nullable: false })
  birth_date: Date;

  @Column("boolean", { default: true })
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Address, (address) => address.users)
  address: Address[];

  @OneToMany(() => UserProject, (userProject) => userProject.users)
  userProjects: UserProject[];
}
