
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn, PrimaryColumn, Timestamp } from "typeorm";
import { Tenant } from "./Tenant";
@Entity("Rental")
export class Rental extends BaseEntity {

    @PrimaryGeneratedColumn()
    idRental: number;

    /*@OneToOne(_type => Tenant) @JoinColumn({ name: 'idTenant' })
    idTenant: number;*/

    @Column()
    idTenant: number;

    @Column()
    idVehicle: number;

    @Column()
    rentaldate: Date;

    @Column()
    rentaltime: String;

    @Column()
    plannedrestitutiondate: Date;

    @Column()
    plannedrestitutiontime: String;

    @Column()
    restitutionDate: Date;

    @Column()
    restitutionTime: String;

    @Column()
    rentalType: String;

    @Column()
    iddepartborne: number;

    @Column()
    iddestborne: number;

    @Column()
    rentalstate: String;

}
