import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity("Agent")
export class Agent extends BaseEntity {

    @PrimaryGeneratedColumn()
    idAgent: number;

    @Column()
    idUser: number;

    @Column()
    personalPhoto: string;

    @Column()
    refPermis: string
}