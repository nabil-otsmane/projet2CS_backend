import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn} from "typeorm";
import {Tenant} from "./Tenant";

@Entity("Rental")
export class Rental extends BaseEntity {

    @PrimaryGeneratedColumn()
    idRental: number;

    @Column()
    idTenant: number;

    @Column()
    idVehicle: number;

    @Column()
    rentaldate: Date;

    @Column()
    rentaltime: string;

    @Column()
    plannedrestitutiondate: Date;

    @Column()
    plannedrestitutiontime: string;

    @Column()
    restitutionDate: Date;

    @Column()
    restitutionTime: string;

    @Column()
    rentalType: number;


}
