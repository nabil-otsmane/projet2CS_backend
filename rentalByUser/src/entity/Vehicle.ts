import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, Double} from "typeorm";

@Entity("Vehicle")
export class Vehicle extends BaseEntity {

    @PrimaryGeneratedColumn()
    idVehicle: number;

    @Column()
    unitPricePerHour: number;

    @Column()
    unitPricePerDay: number;

    @Column()
    vehiclebrand : string;

   


}
