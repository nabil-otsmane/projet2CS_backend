import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity("Rental")
export class Rental extends BaseEntity {

    @PrimaryGeneratedColumn()
    idRental: number;

    @Column()
    idTenant: number;

    @Column()
    idVehicle: number;

    @Column()
    rentalstate: String;

}
