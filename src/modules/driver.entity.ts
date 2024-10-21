import "reflect-metadata";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseDatabaseEntity } from "./base.entity";
import { PrimaryGeneratedColumnIdentityOptions } from "typeorm/decorator/options/PrimaryGeneratedColumnIdentityOptions";
import { PrimaryGeneratedColumnNumericOptions } from "typeorm/decorator/options/PrimaryGeneratedColumnNumericOptions";


@Entity({name: "driver"})
export class Drivers extends BaseDatabaseEntity {
  static find(arg0: (d: { email: any; password: any; }) => boolean) {
      throw new Error("Method not implemented.");
  }
  static push(newDriver: { id: number; name: any; email: any; password: any; }) {
      throw new Error("Method not implemented.");
  }
  static findById(driverId: string) {
    throw new Error('Method not implemented.');
  }
  save() {
    throw new Error('Method not implemented.');
  }
  @PrimaryGeneratedColumn()
  driverId!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  phone!: string;

  @Column()
  password!: string;

  @Column()
  verification!: string;

  @Column()
  approved!: boolean;

  @Column()
  documents!: string;

  @Column()
  rideDate!: Date;

  
}



