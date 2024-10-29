import { Router } from "express";
import { registerDriver,  loginDriver, getDriverProfile, createRide, getDriverRides, updateRide, deleteRide, } from "../controllers/driverController";

const router = Router();

router.post("/register", registerDriver);
router.post("/login", loginDriver); 
router.get("/:driverId", getDriverProfile);
router.post("/:driverId/rides", createRide); 
router.get("/:driverId/rides", getDriverRides);  
router.put("/rides/:rideId", updateRide); 
router.delete("/rides/:rideId", deleteRide); 


export default router;





