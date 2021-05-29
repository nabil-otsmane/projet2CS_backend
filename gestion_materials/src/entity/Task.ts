import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  BeforeInsert,
} from "typeorm";
import { UsedEquipment } from "./UsedEquipment";

import { v4 as uuid } from "uuid";

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
  description: string;

  @Column()
  idTaskState: number;

  @OneToMany(() => UsedEquipment, (usedEquipment) => usedEquipment.task)
  usedEquipments: UsedEquipment[];

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
