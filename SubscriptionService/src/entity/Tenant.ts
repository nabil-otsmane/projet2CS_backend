import { Entity, PrimaryGeneratedColumn, Column, BaseEntity,
                 OneToOne, JoinColumn } from "typeorm";
import { Subscription } from "./Subscription";


@Entity("Tenant")
export class Tenant extends BaseEntity {

    @PrimaryGeneratedColumn()
    idTenant: number;

    @Column()
    accountState: string;

    @Column({ 
        type: 'integer',
        nullable: true
    })
    subCard!: number|null;

    @OneToOne(()=> Subscription, sub => sub.tenant)
    @JoinColumn({ name: "subCard"})
    sub : Subscription
}
