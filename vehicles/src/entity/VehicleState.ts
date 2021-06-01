import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";


@Entity("VehicleState")
export class VehicleState extends BaseEntity {

    @PrimaryGeneratedColumn()
    idVehicleState: number;

    @Column()
    availability: string;
   
    @Column()
    idBorne: number;

    @Column()
    idRental:number;
}
