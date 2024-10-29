import "reflect-metadata";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseDatabaseEntity } from "./base.entity";




@Entity({name: "user"})
export class User extends BaseDatabaseEntity {
  static userId: any;
  static update(userId: any, arg1: { deletedAt: Date; }) {
    throw new Error("Method not implemented.");
  }
  username: any;
  static findOne(arg0: { $or: ({ username: string; } | { email: string; })[]; }) {
      throw new Error('Method not implemented.');
  }
  static splice(_Users: typeof User, _arg1: number) {
     throw new Error("Method not implemented.");
  }
  static findIndex(arg0: (user: { id: number; }) => boolean) {
      throw new Error("Method not implemented.");
  }
  static find(arg0: (u: { id: string; }) => boolean) {
      throw new Error("Method not implemented.");
  }
  //phoneNumber: string;
    //name: string;
  save() {
    throw new Error('Method not implemented.');
  }

  @PrimaryGeneratedColumn() // This creates an auto-incrementing 'id' column
  id!: number;

  @PrimaryGeneratedColumn()
  userId!:number;

  
  @Column()
  firstName!: string;


  @Column()
  lastName!: string;

  @Column({ type: "char", length: 4, default: "GH" })
  country!: string;

  @Column({ unique: true, nullable: true })
  email!: string;

  @Column({ unique: true, nullable: true })
  phoneNumber!: string;

  @Column({ nullable: true, type: "text" })
  password!: string;

  @Column({ type: "boolean", default: false })
  phoneVerified!: boolean;

  @Column({ type: "boolean", default: false })
  emailVerified!: boolean;

  @Column({ nullable: true, type: "text" })
  profilePicture!: string;
}


