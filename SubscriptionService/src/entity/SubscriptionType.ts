import { type } from "node:os";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity,
                         OneToMany, JoinColumn } from "typeorm";
import { Subscription } from "./Subscription";


@Entity("SubscriptionType")
export class SubscriptionType extends BaseEntity {

    @PrimaryGeneratedColumn()
    idSubType: number;

    @Column()
    subTypeName: string;

    @Column()
    subTypeDuration: number;

    @Column()
    reductionRate: number;

    @Column()
    bonusPointsRate: number;

    @OneToMany(()=> Subscription, subs => subs.subTypeO)
    @JoinColumn({ name: "subs"})
    subs : SubscriptionType[]


}
