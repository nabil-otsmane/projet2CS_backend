import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { IsEnum } from "class-validator";

@Entity("User")
export class UserType extends BaseEntity {
  @PrimaryGeneratedColumn()
  idUser: number;

  @Column({
    type: "enum",
    enum: [
      "tenant",
      "agent",
      "decision_maker",
      "agent_admin",
      "account_admin",
      "technical_admin",
    ],
    default: "agent",
  })
  @IsEnum([
    "tenant",
    "agent",
    "decision_maker",
    "agent_admin",
    "account_admin",
    "technical_admin",
  ])
  userType: string;

  toJSON() {
    return { ...this };
  }
}
