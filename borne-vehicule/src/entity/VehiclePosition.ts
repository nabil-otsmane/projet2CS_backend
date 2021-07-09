import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity("VehiclePosition")
export class VehiclePosition extends BaseEntity {

    @PrimaryGeneratedColumn()
    idPosition: number;

    @Column()
    idRental: number;

}
