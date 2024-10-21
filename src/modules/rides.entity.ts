import "reflect-metadata";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseDatabaseEntity } from "./base.entity";
import { PrimaryGeneratedColumnIdentityOptions } from "typeorm/decorator/options/PrimaryGeneratedColumnIdentityOptions";


@Entity({name: "ride"})
export class Rides extends BaseDatabaseEntity {
  static deleteOne(arg0: { _id: string; }) {
      throw new Error("Method not implemented.");
  }
  static push(newRide: { id: number; driverId: any; destination: any; time: any; }) {
      throw new Error("Method not implemented.");
  }
  static filter(arg0: (b: {
      id: number;
      driverId: number; rideId: string; 
}) => boolean) {
      throw new Error("Method not implemented.");
  }
  static find(arg0: (r: { id: string; }) => boolean) {
      throw new Error("Method not implemented.");
  }
 // driver: import("c:/Users/USER/OneDrive/Desktop/CARPOOL/carpool-backend/src/models/driver.entity").DriverEntity;
  static findById(rideId: string) {
    throw new Error('Method not implemented.');
  }
  save() {
    throw new Error('Method not implemented.');
  }
  @PrimaryGeneratedColumn()
  RideId!: number;

  @Column()
  user!: string;

  @Column()
  pickupLocation!: string;

  @Column()
  dropoffLocation!: string;

  @Column()
  status!: string;

  @Column()
  fare!: number;
}


