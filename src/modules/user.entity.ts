import "reflect-metadata";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseDatabaseEntity } from "./base.entity";

@Entity()
export class Users extends BaseDatabaseEntity {
  @Column()
  firstName!: string;

  @Column({ nullable: true })
  title!: string;

  @Column()
  lastName!: string;

  @Column({ type: "char", length: 4, default: "GH" })
  country!: string;

  @Column({ unique: true, nullable: true })
  email!: string;

  @Column({ unique: true, nullable: true })
  phone!: string;

  @Column({ nullable: true, type: "text" })
  password!: string;

  @Column({ type: "boolean", default: false })
  phoneVerified!: boolean;

  @Column({ type: "boolean", default: false })
  emailVerified!: boolean;

  @Column({ nullable: true, type: "text" })
  profilePicture!: string;
}
