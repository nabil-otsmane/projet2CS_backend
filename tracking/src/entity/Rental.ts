import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, Timestamp} from "typeorm";
export enum rental_status_enum {
    ACTIVE="active",
    ARCHIVED="archived"
}

@Entity("Rental")
export class Rental extends BaseEntity {

    @PrimaryGeneratedColumn()
    idRental: number;

    @Column()
    idTenant:number;

    @Column()
    idVehicle:number;

    @Column()
    rentalstate:String;

    @Column()
    rentaldate:Date; 

    @Column()
    rentaltime:String; 

    @Column()
    iddepartborne:number;

    @Column()
    iddestborne:number;

}
