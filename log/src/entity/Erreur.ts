import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity("Erreur")
export class Erreur extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    message: string;
}
