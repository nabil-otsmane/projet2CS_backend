import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity("Tenant")
export class Locataire extends BaseEntity {

    @PrimaryGeneratedColumn()
    idTenant: number;

    @Column()
    idUser: number;

    @Column()
    refPermit: string;

    @Column()
    profilePicture: string;

    @Column()
    permitPicture: string;

    @Column()
    selfie: string;

    @Column()
    accountState: string

    @Column()
    stateMessage: string

    @Column()
    validationDate: string
}