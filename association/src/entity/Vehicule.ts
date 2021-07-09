import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity("Vehicle")
export class Vehicule extends BaseEntity {

    @PrimaryGeneratedColumn()
    idVehicle: number;

    @Column()
    longitude: number;

    @Column()
    latitude: number;

    @Column()
    availibility: string
<<<<<<< HEAD
    
=======
>>>>>>> a228cfe4620dc7f815401f8bb9f08d51d33beef2
}
