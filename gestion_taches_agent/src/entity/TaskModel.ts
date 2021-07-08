import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { Step } from "../entity/Step";
import { Task } from "./Task";

@Entity("TaskModel")
export class TaskModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  taskModelName: string;

  @OneToMany(() => Step, (step) => step.model)
  steps: Step[];

  @OneToMany(() => Task, (task) => task.taskModel)
  tasks: Task[];
}
