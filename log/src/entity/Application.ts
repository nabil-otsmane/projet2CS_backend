import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity("Application")
export class Application extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nomApp: string;

    @Column({type :"float"})
    tauxUtilisation: number;
    
}
