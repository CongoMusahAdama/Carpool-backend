import { DataSource } from "typeorm";
import { User } from "../modules/user.entity"
require("dotenv").config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [ User ], //importing the user entity in the data source
  migrations: [],
  subscribers: [],
});
