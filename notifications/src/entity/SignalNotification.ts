import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity("SignalNotification")
export class SignalNotification extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    read: boolean; 

    @Column()
    idSignal: number;

}
