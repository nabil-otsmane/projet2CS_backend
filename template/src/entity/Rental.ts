
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn} from "typeorm";
import {Tenant} from "./Tenant";
@Entity("Rental")
export class Rental extends BaseEntity {

    @PrimaryGeneratedColumn()
    idRental: number;

    @OneToOne(_type => Tenant) @JoinColumn({name : 'idTenant'})
    idTenant: number;

    @Column()
    idVehicle: number;

    @Column()
    rentalDate: Date;

    @Column()
    rentalTime: Date;

    @Column()
    plannedRestitutionDate: Date;

    @Column()
    plannedRestitutionTime: Date;

    @Column()
    restitutionDate: Date;

    @Column()
    restitutionTime: Date;

    @Column()
    rentalType: number;


}
