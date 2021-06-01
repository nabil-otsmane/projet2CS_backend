import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity("AdminAccount")
export class AdminCompte extends BaseEntity {

    @PrimaryGeneratedColumn()
    idAdminAccount: number;

    @Column()
    idUser: number;
}