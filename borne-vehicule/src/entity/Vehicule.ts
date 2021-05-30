import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity("Vehicle")
export class Vehicule extends BaseEntity {

    @PrimaryGeneratedColumn()
    idVehicle: number;

    @Column()
    unitPricePerHour: number;

    @Column()
    unitPricePerDay: number;

    @Column()
    vehicleType: String;

    @Column()
    vehiclebrand: String;

    @Column()
    vehiclemodel: String;

    @Column()
    fuelType: String

    @Column()
    registrationNumber: String

    @Column()
    vehicleColor: String

    @Column()
    idBorne: Number

    @Column({ type: "float" })
    longitude: Number

    @Column({ type: "float" })
    latitude: Number

}
