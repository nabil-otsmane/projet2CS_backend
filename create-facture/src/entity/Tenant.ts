import { Entity, BaseEntity, PrimaryColumn, Column, OneToMany, JoinColumn } from "typeorm";
import { Rental } from './Rental'
@Entity("Tenant")
export class Tenant extends BaseEntity {

    @PrimaryColumn()
    idTenant: number;

    @Column()
    idUser: number;

    @Column()
    profilePicture: string;

    @OneToMany(() => Rental, rental => rental.idTenant)
    @JoinColumn({ name: "idTenant" })
    rental: Rental[];

}
