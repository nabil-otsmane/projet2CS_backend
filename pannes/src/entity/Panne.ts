import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity("Panne")
export class Panne extends BaseEntity {

    @PrimaryGeneratedColumn()
    idPanne: number;

    @Column()
    state:String;

    @Column()
    idVehicle:number

    @Column()
    description:String; 

    /*@Column()
    sevirityLevel:number;*/
}
