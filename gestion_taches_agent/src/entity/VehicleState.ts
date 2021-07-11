import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

/**
 * This represents a task entity which is the main element in tasks service.
 */
@Entity("VehicleState")
export class VehicleState extends BaseEntity {
  @PrimaryGeneratedColumn()
  idVehicleState: number;

  @Column()
  idRental: number;

  @Column()
  vidange: number;
}
