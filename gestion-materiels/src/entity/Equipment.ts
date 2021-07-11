import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { SharedAttributes } from "./SharedAttributes";
import { UsedEquipment } from "./UsedEquipment";

/**
 * This represents a task entity which is the main element in tasks service.
 */
@Entity("Equipment")
export class Equipment extends SharedAttributes {
  @PrimaryGeneratedColumn()
  idEquipment: number;

  @Column()
  equipmentName: string;

  @Column({ type: "double precision" })
  unitPrice: number;

  @Column()
  category: string;

  @OneToMany(
    () => UsedEquipment,
    (usedEquipment: UsedEquipment) => usedEquipment.equipment
  )
  usedEquipments: UsedEquipment[];

  toJSON() {
    return { ...this, idEquipment: undefined };
  }
}
