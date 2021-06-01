import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from "typeorm";

@Entity("AuthUser")
export class AuthUser extends BaseEntity {

    @PrimaryGeneratedColumn()
    idAuthUser: number;

    @Column()
    idUser: number;

    @Column()
    email: string;

}