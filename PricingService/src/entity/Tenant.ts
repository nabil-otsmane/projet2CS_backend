import { type } from "node:os";
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity,PrimaryColumn, OneToOne, JoinColumn} from "typeorm";

import{User} from './User'

@Entity("Tenant")
export class Tenant extends User {

    @PrimaryColumn()
    idTenant: number;

}
