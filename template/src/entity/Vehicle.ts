import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, Double} from "typeorm";

@Entity("Vehicle")
export class Vehicle extends BaseEntity {

    
    @PrimaryGeneratedColumn()
  idVehicle: number;

  @Column()
  unitPricePerHour: number;

  @Column()
  unitPricePerDay: number;

  @Column()
  vehicleType: String;

  @Column()
  vehiclebrand: String;

  @Column()
  vehiclemodel: String;

  @Column()
  fuelType: String;

  @Column()
  registrationNumber: String;

  @Column()
  vehicleColor: String;

  @Column()
  idBorne: Number;

  @Column({ type: "float" })
  longitude: Number;

  @Column({ type: "float" })
  latitude: Number;

  @Column()
  image: String;

  @Column({
    type: "enum",
    enum: ["available", "allocated"],
    default: "available",
  })
  availibility: String;

    @Column()
    chassisNumber:String;

    @Column()
    speed:number;

    @Column()
    numberOfPlaces:number;


   


}
