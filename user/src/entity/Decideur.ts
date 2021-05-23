import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity("DecisionMaker")
export class Decideur extends BaseEntity {

    @PrimaryGeneratedColumn()
    idDecisionMaker: number;

    @Column()
    idUser: number;
}