import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, Double, Timestamp} from "typeorm";

@Entity("User")
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    idUser: number;

    @Column()
    userName: String;

    @Column()
    phoneNumber: number;

    @Column()
    lastName: String;

    @Column()
    firstName: String;

    @Column()
    address: String

    @Column()
    userType: String;
}
