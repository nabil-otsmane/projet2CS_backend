import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity("Vehicule")
export class Vehicule extends BaseEntity {

    @PrimaryGeneratedColumn()
    idVehicle: number;

    @Column()
    unitpriceperhour: number;

    @Column()
    unitpriceperday: number;

    @Column()
    vehiculetype: String;

    @Column()
    vehiculebrand: String;

    @Column()
    vehiclemodel: String;

    @Column()
    availability: boolean;

    @Column()
    image: String;
}
