import { Request, Response } from "express";
import { RideService } from "../services/ridesServices";
import { getRepository } from "typeorm";
import { Ride } from "../modules/rides.entity";

const rideService = new RideService();

export const searchRides = async (req: Request, res: Response) => {
  try {
      const { pickupLocation, dropoffLocation, date } = req.body;
      
      // Convert date string to Date object
      const rideDate = new Date(date);
      if (isNaN(rideDate.getTime())) {
          throw new Error("Invalid date format");
      }

      const rides = await getRepository(Ride).find({
          where: { pickupLocation, dropoffLocation, date: rideDate },
      });

      res.json(rides);
  } catch (error) {
      res.status(500).json(error);
  }
};

export const bookRide = async (req: Request, res: Response) => {
  const { userId, rideId } = req.body;
  try {
    const result = await rideService.bookRide(userId, rideId);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: "Unable to book ride" });
  }
};


