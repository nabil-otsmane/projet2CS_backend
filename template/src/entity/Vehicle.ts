import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, Double} from "typeorm";

@Entity("Vehicle")
export class Vehicle extends BaseEntity {

    @PrimaryGeneratedColumn()
    idVehicle: number;

    @Column()
    unitpriceperhour: String;

    @Column()
    unitpriceperday: String;

    @Column()
    vehicletype: String;

    @Column()
    vehiclebrand: String;

    @Column()
    vehiclemodel: String;

    @Column()
    availibility: String;

    @Column()
    image:String;


   


}
