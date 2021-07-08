import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity("AdminTechnical")
export class AdminTechnique extends BaseEntity {

    @PrimaryGeneratedColumn()
    idAdminTech: number;

    @Column()
    idUser: number;
}