
import { Entity, Column, BaseEntity, PrimaryColumn } from "typeorm";
@Entity("Rental")
export class Rental extends BaseEntity {

    @PrimaryColumn()
    idRental: number;

    @Column()
    rentalstate: String;

}
