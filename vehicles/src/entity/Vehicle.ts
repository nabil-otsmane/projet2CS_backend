import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, Double} from "typeorm";

@Entity("Vehicle")
export class Vehicle extends BaseEntity {

    @PrimaryGeneratedColumn()
    idVehicle: number;

    @Column()
    vehicletype: string;

    @Column()
    vehiclemodel: string;

    @Column()
    vehiclebrand: string;

    @Column()
    image: string;

    @Column()
    vehicleColor:string;

    @Column()
    registrationNumber:string;

    @Column()
    availibility:string;

    @Column()
    unitpriceperhour:number;

    @Column()
    unitpriceperday:number;
}
