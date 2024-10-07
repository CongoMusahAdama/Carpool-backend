import cors from "cors";
import express from "express";
import { errorHandler } from "./core/global-error";
import apiRouter from "./routes/routes";
import { AppDataSource } from "./core/data-source";
// import localLogger from "./core/local-logger";
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api-v1", apiRouter);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Pharm-pod is running on  PORT - ${process.env.PORT}`);
  // localLogger.info(`Server is running on  PORT - ${process.env.PORT}`);
});

// AppDataSource.initialize()
//   .then(() => {
//     console.log(`Database initialized successfully`);
//     // localLogger.info("Database connected successfully for auth service");
//   })
//   .catch((error) => {
//     console.error(`There was an error initializing database: `, error);
//     // localLogger.error(
//     //   JSON.stringify({
//     //     statusCode: 500,
//     //     errorCode: "DATABASE_CONNECTION_FAILED",
//     //     error: error.message,
//     //   })
//     // );
//   });
