import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity("AgentTokenNotif")
export class AgentTokenNotif extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idAgent: number;

  @Column()
  token: string;
}
