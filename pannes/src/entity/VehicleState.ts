import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, Double} from "typeorm";

@Entity("VehicleState")
export class VehicleState extends BaseEntity {

    @PrimaryGeneratedColumn()
    idVehiclecd pState: number;

    @Column()
    idRental:number;

    @Column()
    idBorne:number;

    @Column()
    engineTemp:number;

    @Column()
    fuelLevel:number;

    @Column()
    oilPressure:number;

    @Column()
    batteryCharge:number;

    @Column()
    brakeFuild:number;

    @Column()
    speed:number;

}
