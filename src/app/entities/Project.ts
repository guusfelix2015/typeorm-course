import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserProject } from "./UserProject";

@Entity("projects")
export class Project {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("varchar", { nullable: false, length: 100, unique: true })
  name: string;

  @Column("varchar", { nullable: false, length: 255 })
  description: string;

  @Column("date", { nullable: false })
  start_at: Date;

  @Column("date", { nullable: false })
  end_at: Date;

  @Column("boolean", { default: true })
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => UserProject, (userProject) => userProject.projects)
  userProjects: UserProject[];
}
