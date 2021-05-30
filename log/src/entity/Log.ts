import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, ManyToOne, JoinColumn} from "typeorm";
import { Application } from "./Application";
import { Erreur } from "./Erreur";

@Entity("Log")
export class Log extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp' })
    date: string;

    @Column()
    details: string;

    @ManyToOne(() => Application, {onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn()
    idApp : Application;

    @OneToOne(() => Erreur, { nullable: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn()
    idErreur : Erreur;
    
}
