import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity("Vehicle")
export class Vehicle extends BaseEntity {

    @PrimaryGeneratedColumn()
    idVehicle: number;

    @Column()
    availibility:string;
}
