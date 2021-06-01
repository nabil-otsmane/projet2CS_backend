import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity("Vehicle")
export class Vehicule extends BaseEntity {

    @PrimaryGeneratedColumn()
    idVehicle: number;

    @Column()
    longitude: number;

    @Column()
    latitude: number;
}
