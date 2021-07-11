import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn } from "typeorm";
import { Tenant } from './Tenant'
@Entity("User")
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    idUser: number;

    @Column()
    phoneNumber: string;

    @Column()
    lastName: string;

    @Column()
    firstName: string;

    @Column()
    address: string;

    @OneToOne(() => Tenant)
    @JoinColumn({ name: "idUser", referencedColumnName: "idUser" })
    tenant: Tenant;

}
