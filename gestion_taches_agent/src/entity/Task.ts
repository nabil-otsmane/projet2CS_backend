import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
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

  @Column()
  idEquipment: number;
}
