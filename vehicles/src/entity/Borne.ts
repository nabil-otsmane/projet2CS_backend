import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity("Borne")
export class Borne extends BaseEntity {

    @PrimaryGeneratedColumn()
    idBorne: number;

    @Column()
    city: string; 
}
