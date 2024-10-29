import { createLogger, format, transports } from "winston";
import { loggerService } from "../services/loggerService";


 const logger = createLogger({
   transports: [new transports.Console()],
   format: format.combine(format.json(), format.colorize(), format.timestamp()),
 });

 export default {
   debug: (message: string) => {
     logger.log("debug", message);
   },
  error: (message: string) => {
     loggerService.error(message, "pharm-pod");
   },
   info: (message: string) => {
     loggerService.info(message, "pharm-pod");
   },
 };
