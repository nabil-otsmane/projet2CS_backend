import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Generated,
  BaseEntity,
  CreateDateColumn,
} from "typeorm";
import { IsEmail, IsEnum, Length } from "class-validator";

@Entity("Auth_utilisateur")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @Length(1, 255)
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @Column()
  @Generated("uuid")
  uuid: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({
    type: "enum",
    enum: [
      "locataire",
      "agent",
      "decideur",
      "adminAegnt",
      "adminCompte",
      "adminTechnique",
    ],
    default: "locataire",
  })
  @IsEnum([
    "locataire",
    "agent",
    "decideur",
    "adminAegnt",
    "adminCompte",
    "adminTechnique",
    undefined,
  ])
  role: string;

  toJSON() {
    return { ...this, id: undefined, password: undefined };
  }
}
