import { type } from "node:os";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from "typeorm";
import { SubscriptionType } from "./SubscriptionType";


@Entity("Subscription")
export class Subscription extends BaseEntity {

    @PrimaryGeneratedColumn()
    idSub: number;

    @Column()
    subType: number;

    @Column()
    subState: String;

    @ManyToOne(()=> SubscriptionType, subTypeO => subTypeO.subs)
    @JoinColumn({ name: "subType"})
    subTypeO : SubscriptionType
    

}
