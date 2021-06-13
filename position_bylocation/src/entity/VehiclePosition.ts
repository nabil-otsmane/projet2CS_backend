import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, Timestamp} from "typeorm";
export enum rental_status_enum {
    ACTIVE="active",
    ARCHIVED="archived"
}

@Entity("VehiclePosition")
export class VehiclePosition extends BaseEntity {

    @PrimaryGeneratedColumn()
    idPosition: number;

    @Column()
    idRental:number;

}
