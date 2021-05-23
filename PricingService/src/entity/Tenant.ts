import { type } from "node:os";
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

import{User} from './User'

@Entity("Tenant")
export class Tenant extends BaseEntity {

    @PrimaryGeneratedColumn()
    idTenant: number;

    @Column()
    points: number;

    @Column()
    accountState: string;

}
