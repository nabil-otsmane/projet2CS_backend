import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, Timestamp} from "typeorm";


@Entity("Signal")
export class Signal extends BaseEntity {

    @PrimaryGeneratedColumn()
    idSignal: number;

    @Column()
    signalType:String;

    @Column()
    message:String;

    @Column()
    sourceType:String;

    @Column({ nullable: true })
    idUserSource:number;
    default:null;
   
    @Column()
    idVehicle:number;

    @Column()
    sent_at:Date;

    @Column()
    treated:boolean;

}
