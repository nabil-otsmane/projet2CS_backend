import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity("Agent")
export class Agent extends BaseEntity {

    @PrimaryGeneratedColumn()
    idAgent: number;

    @Column()
    idUtilisateur: number;

    @Column()
    adresse: string;
}