import { Entity, BaseEntity, PrimaryColumn, Column } from "typeorm";
@Entity("Rental")
export class Rental extends BaseEntity {

    @PrimaryColumn()
    idRental: number;

    @Column()
    idTenant: number;

    @Column()
    idVehicle: number;

    @Column()
    rentalType: string;

    @Column()
    rentaldate: Date;

    @Column()
    plannedrestitutiondate: Date;


}
