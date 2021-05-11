import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm";
@Entity("Stripe_customers")
export class StripeCustomers extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    cusromerId: string;

    @Column()
    userId: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;


}