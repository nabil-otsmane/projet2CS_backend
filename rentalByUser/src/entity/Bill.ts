import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, Double} from "typeorm";

@Entity("Bill")
export class Bill extends BaseEntity {

    @PrimaryGeneratedColumn()
    idBill: number;

    @Column()
    idRental: number;

    @Column()
    totalRate: number;

   

   


}
