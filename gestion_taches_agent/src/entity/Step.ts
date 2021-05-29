import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne} from "typeorm";
import {TaskModel} from "./TaskModel"; 

@Entity("Step")
export class Step extends BaseEntity {

    @PrimaryGeneratedColumn()
    idStep: number;

    @Column()
    step: string;

    @ManyToOne(() => TaskModel, taskModel => taskModel.steps, {
        onDelete: 'CASCADE', 
        onUpdate: 'CASCADE'
    })
    model: TaskModel;
  
}


