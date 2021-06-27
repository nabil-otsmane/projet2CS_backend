import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn} from "typeorm";

@Entity("RentalPenalty")
export class RentalPenalty extends BaseEntity {

    @PrimaryGeneratedColumn()
    idRentPenalty: number;

    @Column()
    idPenalty: number;

    @Column()
    idRental: number;

}
