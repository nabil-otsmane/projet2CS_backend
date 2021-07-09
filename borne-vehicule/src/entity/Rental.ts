import { Entity, BaseEntity, PrimaryColumn, Column } from "typeorm";

@Entity("Rental")
export class Rental extends BaseEntity {

  @PrimaryColumn()
  idRental: number;

  @Column()
  idVehicle: number;

  @Column()
  rentaltime: string;

  @Column()
  rentaldate: Date;

}
