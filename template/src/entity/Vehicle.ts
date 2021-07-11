import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, Double} from "typeorm";

@Entity("Vehicle")
export class Vehicle extends BaseEntity {

    @PrimaryGeneratedColumn()
    idVehicle: number;

    @Column()
    unitPricePerHour: String;

    @Column()
    unitPricePerDay: String;

    @Column()
    vehicleType: String;

    @Column()
    vehiclebrand: String;

    @Column()
    vehiclemodel: String;

    @Column()
    availibility: String;

    @Column()
    image:String;

    @Column()
    vehicleColor:String;

    @Column()
    registrationNumber:String;

    @Column()
    idBorne: number;

    @Column()
    fuelType:String;

    @Column()
    longitude:number;
   
    @Column()
    latitude:number;

    @Column()
    chassisNumber:String;

    @Column()
    speed:number;

    @Column()
    numberOfPlaces:number;


   


}
