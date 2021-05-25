import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, Timestamp} from "typeorm";

@Entity("Signal")
export class Signal extends BaseEntity {

    @PrimaryGeneratedColumn()
    idSignal: number;

    @Column()
    signalType: string

    @Column()
    message: string;

    @Column()
    sourceType: string;

    @Column()
    idUserSource: number

    @Column()
    idVehicle: number

    @Column()
    sent_at: Date
   
    @Column({ nullable: true })
    treated: boolean
}