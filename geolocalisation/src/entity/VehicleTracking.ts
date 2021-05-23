import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn} from "typeorm";
import { VehiclePosition } from "./VehiclePosition";

@Entity("VehicleTracking")
export class VehicleTracking extends BaseEntity {

    @PrimaryGeneratedColumn()
    idTrack: number;

    @Column("decimal", {precision: 9, scale: 6})
    latitude: number;

    @Column("decimal", {precision: 9, scale: 6})
    longitude: number;

    @Column("timestamp")
    created_at: Date;

    @Column()
    idPosition: number;
    @ManyToOne(() => VehiclePosition, position => position.trajet)
    @JoinColumn({ name: "idPosition" })
    position: VehiclePosition;

}
