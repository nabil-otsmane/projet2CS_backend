import {Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("Vehicle")
export class Vehicle{

    @PrimaryGeneratedColumn()
    idVehicle: number;   

}
