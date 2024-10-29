import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import express from "express";
import { errorHandler } from "./core/global-error";
import { AppDataSource } from "./core/data-source";
import rideRoutes from "./routes/rides";
import userRoutes from "./routes/user.routes";
import driverRoutes from "./routes/driver.routes";

import localLogger from "./core/local-logger";
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(helmet());

//app.use("/api-v1", apiRouter);
app.use(errorHandler);


//Routes
app.use("/api/ride", rideRoutes);   //routes for ride-related functionalities
app.use("/api/users", userRoutes);   //routes for user-related functionalities
app.use("/api/driver", driverRoutes); //routes for drivers-related functionalities 



//appleAuthorization
//gmailAuthorization
app.listen(process.env.PORT, () => {
  console.log(`Pharm-pod is running on  PORT - ${process.env.PORT}`);
  // localLogger.info(`Server is running on  PORT - ${process.env.PORT}`);
});


AppDataSource.initialize()
   .then(() => {
     console.log(`Database initialized successfully`);
      localLogger.info("Database connected successfully for auth service");
})
   .catch((error) => {
     console.error(`There was an error initializing database: `, error);
      localLogger.error(
   JSON.stringify({
     statusCode: 500,
     errorCode: "DATABASE_CONNECTION_FAILED",
     error: error.message,
   })
 );
   }); 



