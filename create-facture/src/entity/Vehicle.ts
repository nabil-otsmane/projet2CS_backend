import { Entity, BaseEntity, Column, PrimaryColumn } from "typeorm";
@Entity("Vehicle")
export class Vehicle extends BaseEntity {
    @PrimaryColumn()
    idVehicle: number;

    @Column()
    unitpriceperhour: string;

    @Column()
    unitpriceperday: string;

}
