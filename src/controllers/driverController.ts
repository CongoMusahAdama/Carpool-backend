import { Request, Response } from "express";
import { DriverService } from "../services/driverServices";

const driverService = new DriverService();

export const registerDriver = async (req: Request, res: Response) => {
  const driverData = req.body;
  try {
    const driver = await driverService.registerDriver(driverData);
    res.status(201).json({ message: "Driver registered successfully", driver });
  } catch (error) {
    res.status(400).json({message: "Failed to register driver"  });
  }
};

export const loginDriver = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const result = await driverService.loginDriver(email, password);
    res.json(result);
  } catch (error) {
    res.status(401).json({ message: "Unable to login" });
  }
};

export const createRide = async (req: Request, res: Response) => {
  const driverId = parseInt(req.params.driverId);
  const rideData = req.body;
  try {
    const ride = await driverService.createRide(driverId, rideData);
    res.status(201).json(ride);
  } catch (error) {
    res.status(400).json({message: "Unable to create ride" });
  }
};

export const getDriverRides = async (req: Request, res: Response) => {
  const driverId = parseInt(req.params.driverId);
  try {
    const rides = await driverService.getDriverRides(driverId);
    res.json(rides);
  } catch (error) {
    res.status(400).json({message: "Failed getting driver rides" });
  }
};

export const updateRide = async (req: Request, res: Response) => {
  const rideId = parseInt(req.params.rideId);
  const rideData = req.body;
  try {
    const updatedRide = await driverService.updateRide(rideId, rideData);
    res.json(updatedRide);
  } catch (error) {
    res.status(400).json({message: "Failed updating ride" });
  }
};

export const deleteRide = async (req: Request, res: Response) => {
  const rideId = parseInt(req.params.rideId);
  try {
    const result = await driverService.deleteRide(rideId);
    res.json(result);
  } catch (error) {
    res.status(400).json({message: "Failed deleting ride" });
  }
};

export const getDriverProfile = async (req: Request, res: Response) => {
  const driverId = parseInt(req.params.driverId);
  try {
    const driver = await driverService.getDriverProfile(driverId);
    if (driver) {
      res.json(driver);
    } else {
      res.status(404).json({ message: "Driver not found" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};















