import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, Generated, UpdateDateColumn } from "typeorm";

@Entity("Bill")
export class Bill extends BaseEntity {

    @PrimaryGeneratedColumn()
    idBill: number;

    @Column()
    @Generated('increment')
    nbBill: number;

    @Column()
    idRental: number;

    @Column()
    baseRate: number;

    @Column()
    penaltyRate: number;

    @Column()
    totalRate: number;

    @Column()
    report: String;

    @UpdateDateColumn()
    updatedAt: Date;

    @CreateDateColumn()
    creationDate: Date;

}
