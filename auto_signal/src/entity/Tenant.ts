import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, Timestamp} from "typeorm";


@Entity("Tenant")
export class Tenant extends BaseEntity {

    @PrimaryGeneratedColumn()
    idTenant: number;

    @Column()
    idUser:number;

   

}
