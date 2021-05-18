
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn} from "typeorm";
import {Rental} from "./Rental";
import {Penalty} from "./Penalty";
@Entity("RentalPenalty")
export class RentalPenalty extends BaseEntity {

    @PrimaryGeneratedColumn()
    idRentPenalty: number;

    @Column()
    idPenalty: number;

    @Column()
    idRental: number;

}
