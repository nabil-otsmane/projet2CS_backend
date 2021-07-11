import { type } from "node:os";
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity,PrimaryColumn, OneToOne, JoinColumn} from "typeorm";



@Entity("Borne")
export class Borne extends BaseEntity {

    @PrimaryColumn()
    idBorne: number;

    @Column()
    city:String;

}
