import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";
import { Project } from "./Project";

@Entity("users_projects")
export class UserProject {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("int", { nullable: false })
  hours_worked: number;

  @Column("int", { nullable: false })
  user_id: number;

  @Column("int", { nullable: false })
  project_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.userProjects)
  @JoinColumn({ name: "user_id" })
  users: User;

  @ManyToOne(() => Project, (project) => project.userProjects)
  @JoinColumn({ name: "project_id" })
  projects: Project;
}
