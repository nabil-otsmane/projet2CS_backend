import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity("User")
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    idUser: number;

    @Column()
    lastName: string; 

    @Column()
    firstName: string;
}
