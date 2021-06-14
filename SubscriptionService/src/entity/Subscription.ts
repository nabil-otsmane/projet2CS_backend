import { type } from "node:os";
import { Entity, PrimaryGeneratedColumn, Column, 
                BaseEntity, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { SubscriptionType } from "./SubscriptionType";
import { Tenant } from "./Tenant";


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
    solde: number;

    @Column()
    subState: string;

    @Column()
    idTenant: number;

    @ManyToOne(()=> SubscriptionType, subTypeO => subTypeO.subs)
    @JoinColumn({ name: "subType"})
    subTypeO : SubscriptionType

    @OneToOne(()=> Tenant, tenant => tenant.sub)
    @JoinColumn({ name: "idTenant"})
    tenant : Tenant

}
