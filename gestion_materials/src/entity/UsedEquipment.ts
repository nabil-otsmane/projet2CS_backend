import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Equipment } from "./Equipment";
import { Task } from "./Task";
import { SharedAttributes } from "./SharedAttributes";
import { Length, Min, Max } from "class-validator";

/**
 * This represents a task entity which is the main element in tasks service.
 */
@Entity("UsedEquipment")
export class UsedEquipment extends SharedAttributes {
  @PrimaryGeneratedColumn()
  idUsedEquipment: number;

  @Column()
  @Length(5, 255)
  description: string;

  @Column()
  @Min(0)
  @Max(1000)
  quantity: number;

  @ManyToOne(() => Equipment, (equipment) => equipment.usedEquipments)
  equipment: Equipment;

  @ManyToOne(() => Task, (task) => task.usedEquipments)
  task: Task;

  toJSON() {
    return { ...this, idUsedEquipment: undefined };
  }
}
