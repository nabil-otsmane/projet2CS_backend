import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity("Panne")
export class Panne extends BaseEntity {

    @PrimaryGeneratedColumn()
    idPanne: number;

    @Column()
    state:String;

    @Column()
    description:String; 

    @Column()
    dateNotifPanne:Date; 

    @Column()
    dateReparationPanne:Date; 

    @Column()
    idAgentSentNotif:number;

    
    @Column()
    idAgentTreatPanne:number;

    @Column()
    severityLevel:number;
}
