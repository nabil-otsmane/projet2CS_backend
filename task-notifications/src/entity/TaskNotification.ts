import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity("TaskNotification")
export class TaskNotification extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  read: boolean;

  @Column()
  idTask: number;
}
