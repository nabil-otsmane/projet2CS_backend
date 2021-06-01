import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity("BreakdownNotification")
export class BreakdownNotification extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    read: boolean; 

    @Column()
    idPanne: number;

}
