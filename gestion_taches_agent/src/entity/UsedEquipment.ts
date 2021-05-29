import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
} from "typeorm";
import { Task } from "./Task";
/**
 * This represents a task entity which is the main element in tasks service.
 */
@Entity("UsedEquipment")
export class UsedEquipment extends BaseEntity {
  @PrimaryGeneratedColumn()
  idUsedEquipment: number;

  @Column()
  description: string;

  @Column()
  quantity: number;

  @ManyToOne(() => Task, (task) => task.usedEquipments)
  task: Task;

  toJSON() {
    return { ...this, idUsedEquipment: undefined };
  }
}
