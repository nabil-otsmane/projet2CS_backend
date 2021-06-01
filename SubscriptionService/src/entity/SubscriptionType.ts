import { type } from "node:os";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";


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

}
