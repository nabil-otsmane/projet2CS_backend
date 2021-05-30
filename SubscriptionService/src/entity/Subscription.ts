import { type } from "node:os";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";


@Entity("Subscription")
export class Subscription extends BaseEntity {

    @PrimaryGeneratedColumn()
    idSub: number;

    @Column()
    subType: number;

    @Column()
    creationDate: Date;

    @Column()
    expirationDate: Date;

    @Column()
    subState: string;

}
