import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  BeforeInsert,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { UsedEquipment } from "./UsedEquipment";
import { v4 as uuid } from "uuid";
import { TaskModel } from "./TaskModel";

/**
 * This represents a task entity which is the main element in tasks service.
 */
@Entity("Task")
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  idTask: number;

  @Column()
  idAgent: number;

  @Column()
  idVehicle: number;

  @Column()
  taskTitle: string;

  @Column()
  description: string;

  @Column()
  idTaskState: number;

  @CreateDateColumn()
  assignmentDate: Date;

  @Column({
    type: process.env.NODE_ENV == "test" ? undefined : "timestamp",
    nullable: true,
  })
  endDate: Date;

  @OneToMany(() => UsedEquipment, (usedEquipment) => usedEquipment.task)
  usedEquipments: UsedEquipment[];

  @ManyToOne(() => TaskModel, (taskModal) => taskModal.tasks)
  taskModel: TaskModel;

  @Column({ type: "uuid" })
  uuid: string;

  @BeforeInsert()
  createUUID() {
    this.uuid = uuid();
  }

  toJSON() {
    return { ...this, idTask: undefined };
  }
}
