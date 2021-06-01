import {Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("Agent")
export class Agent {

    @PrimaryGeneratedColumn()
    idAgent : number;    

}
