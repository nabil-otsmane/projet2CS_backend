import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, Timestamp} from "typeorm";


@Entity("Borne")
export class Borne extends BaseEntity {

    @PrimaryGeneratedColumn()
    idBorne: number;

    @Column()
    city:String;

}
