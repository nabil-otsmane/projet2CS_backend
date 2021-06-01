import {Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("Borne")
export class Borne {

    @PrimaryGeneratedColumn()
    idBorne : number;    

}
