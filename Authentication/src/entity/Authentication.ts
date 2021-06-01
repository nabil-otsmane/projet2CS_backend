import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { IsEmail, Length } from "class-validator";

@Entity("AuthUser")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  idAuthUser: number;

  @Column()
  idUser: number;

  @Column()
  @Length(1, 255)
  @IsEmail()
  email: string;

  @Column()
  password: string;

  toJSON() {
    return { ...this, password: undefined };
  }
}
