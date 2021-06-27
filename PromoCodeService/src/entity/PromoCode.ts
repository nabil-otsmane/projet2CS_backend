import { Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";


@Entity("PromoCode")
export class PromoCode extends BaseEntity {

    @PrimaryGeneratedColumn()
    idPromoCode: number;

    @Column()
    pricePoints: number;

    @Column()
    reductionRate: number;

}