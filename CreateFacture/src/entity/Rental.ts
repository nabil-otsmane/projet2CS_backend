import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, Double, Timestamp} from "typeorm";

@Entity("Rental")
export class Rental extends BaseEntity {

    @PrimaryGeneratedColumn()
    idRental: number;

    @Column()
    idTenant: number;

    @Column()
    rentaldate: Date;
}
