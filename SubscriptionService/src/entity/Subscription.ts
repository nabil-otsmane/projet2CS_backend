import { type } from "node:os";
import {
    Entity, PrimaryGeneratedColumn, Column,
    BaseEntity, ManyToOne, JoinColumn, OneToOne, ManyToMany, JoinTable
} from "typeorm";
import { SubscriptionType } from "./SubscriptionType";
import { Tenant } from "./Tenant";
import { User } from './User'

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

    @ManyToOne(() => SubscriptionType)
    @JoinColumn({ name: "subType" })
    subTypeO: SubscriptionType

    @OneToOne(() => Tenant, tenant => tenant.sub)
    @JoinColumn({ name: "idTenant" })
    tenant: Tenant

    @ManyToMany(() => User, user => user.idUser)
    @JoinTable({
        name: "Tenant", // table name for the junction table of this relation
        joinColumn: {
            name: "subCard",
            referencedColumnName: "idSub"
        },
        inverseJoinColumn: {
            name: "idUser",
            referencedColumnName: "idUser"
        }
    })
    user: User
}
