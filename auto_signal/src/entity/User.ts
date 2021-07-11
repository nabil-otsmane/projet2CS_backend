import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, Timestamp} from "typeorm";


@Entity("User")
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    idUser: number;

    @Column()
    firstName:String;

    @Column()
    lastName:String;

    @Column()
    phoneNumber:number;

    @Column()
    address:String;

}
