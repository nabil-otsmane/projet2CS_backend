import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, Double} from "typeorm";

@Entity("Bill")
export class Bill extends BaseEntity {

    @PrimaryGeneratedColumn()
    idBill: number;

    @Column()
    nbBill: number;

    @Column()
    idRental: number;

    @Column()
    creationDate:Date;
     
    @Column()
    baseRate: number;

    @Column()
    penaltyRate:number;

    @Column()
    totalRate:number;
    
     @Column()
    report: String;

}
