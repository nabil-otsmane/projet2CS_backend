import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, IsNull } from "typeorm";


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
}
