import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, JoinTable, JoinColumn} from "typeorm";
import { VehicleTracking } from "./VehicleTracking";

@Entity("VehiclePosition")
export class VehiclePosition extends BaseEntity {

    @PrimaryGeneratedColumn()
    idPosition: number;

    @Column()
    idRental: number;

    @OneToMany(() => VehicleTracking, tracking => tracking.position)
    trajet: VehicleTracking[];

}
