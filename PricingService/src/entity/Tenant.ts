import {Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";


@Entity("Tenant")
export class Tenant extends BaseEntity {

    @PrimaryGeneratedColumn()
    idTenant: number;

    @Column()
    points: number;

    @Column()
    accountState: string;

}
