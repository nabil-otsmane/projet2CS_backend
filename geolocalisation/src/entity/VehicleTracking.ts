import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, Timestamp} from "typeorm";
import { VehiclePosition } from "./VehiclePosition";

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
    @ManyToOne(() => VehiclePosition, position => position.trajet)
    @JoinColumn({ name: "idPosition" })
    position: VehiclePosition;

}
