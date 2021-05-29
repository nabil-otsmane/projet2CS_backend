import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity("User")
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    idUser: number;

    @Column()
    userName: String

    @Column()
    lastName: string;

    @Column()
    userType: string

    @Column()
    firstName: string;

    @Column()
    address: number

    @Column()
    phoneNumber: String

    @Column({
        nullable: false,
        default: () => 'NOW()',
        type: 'timestamp'
    })
    creationDate: string
   
}