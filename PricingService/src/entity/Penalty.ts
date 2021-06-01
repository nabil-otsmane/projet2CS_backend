import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";


@Entity("Penalty")
export class Penalty extends BaseEntity {

    @PrimaryGeneratedColumn()
    idPenalty: number;

    @Column()
    penaltyType: string;

    @Column()
    penaltyTotal: number;

}
