import { type } from "node:os";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";


@Entity("Tenant")
export class Tenant extends BaseEntity {

    @PrimaryGeneratedColumn()
    idTenant: number;

    @Column()
    accountState: string;

    @Column()
    subCard: number;
}
