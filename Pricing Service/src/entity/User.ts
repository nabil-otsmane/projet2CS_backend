import {Entity, PrimaryGeneratedColumn, Column, BaseEntity,PrimaryColumn, Double} from "typeorm";

@Entity("User")
export class User extends BaseEntity {

    @PrimaryColumn()
    idUser: number;

    @Column()
    userName: string;

    @Column()
    phoneNumber: number;

    @Column()
    lastName: string;

    @Column()
    firstName: string;

    @Column()
    address: string;

}
