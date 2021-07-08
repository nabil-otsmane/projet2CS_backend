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
    idVehicle: number

    @Column()
    sent_at: Date

    @Column({ nullable: true })
    treated: boolean

    @Column({ nullable: true })
    treatmentDate: Date

    @Column({ nullable: true })
    treatmentDescription:String

    @Column({ nullable: true })
    validatedByAgent:number
    default:0


    @Column({ nullable: true })
    idUserSource:number;
    default:null;

}
