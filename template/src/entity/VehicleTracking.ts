import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity("VehicleTracking")
export class VehicleTracking extends BaseEntity {

    @PrimaryGeneratedColumn()
    idTrack: number;

    @Column("decimal", {precision: 9, scale: 6})
    latitude: number;

    @Column("decimal", {precision: 9, scale: 6})
    longitude: number;

    @Column()
    created_at: string;

    @Column()
    idPosition: number;

}
