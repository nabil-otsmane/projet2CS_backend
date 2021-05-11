import {Entity, PrimaryGeneratedColumn, Column, BaseEntity,OneToOne, JoinColumn} from "typeorm";

import { User } from "./Users"

@Entity("Location")
export class Location extends BaseEntity {

    @PrimaryGeneratedColumn()
    idLocataire: number;

    @OneToOne(type => User)  @JoinColumn({ name: 'id' })
    idUtilisateur: number;

    @Column()
    firstName: string;

    

}
