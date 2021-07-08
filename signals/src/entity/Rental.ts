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
    idVehicle:number;

    @Column()
    rentalstate:String;

    @Column()
    restitutionDate:Date; 

    @Column()
    restitutionTime:String; 

    @Column()
    rentaldate:Date; 

    @Column()
    rentaltime:String; 

    @Column()
    idTenant: number;

    @Column()
    iddepartborne: number;

    @Column()
    iddestborne: number;


}
