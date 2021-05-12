import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm";
@Entity("Payment_methods")
export class PaymentMethods extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    stripeCustomerId: string;

    @Column()
    paymentId: string;

    @Column()
    cardToken: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}