import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity("Borne")
export class Borne extends BaseEntity {

    @PrimaryGeneratedColumn()
    idBorne: number;

    @Column()
    nbOccupiedPlaces: number;

    @Column()
    nbTotalPlaces: number;

    @Column()
    nbMaintenanceAgents: number;


    @Column()
    longitude: string;

    @Column()
    latitude: string;

    @Column()
    city: string;

}
