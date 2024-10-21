import { Router, Request, Response } from "express";
import { Drivers } from "../modules/driver.entity"
import { Rides } from "../modules/rides.entity";
const userRouter = Router();

// Driver Registration
userRouter.post('/api/drivers/register', async (req: Request, res:Response ) => {
    const { name, email, password } = req.body;
    // Add validation and password hashing in a real app //TBC....
    const newDriver = { id: Drivers.length + 1, name, email, password };
    Drivers.push(newDriver);
    res.status(201).json(newDriver);
});

// Driver Login
userRouter.post('/api/drivers/login', async (req:Request, res:Response) => {
    const { email, password } = req.body;
    const driver = Drivers.find((d: { email: any; password: any; }) => d.email === email && d.password === password);
    if (driver) {
        res.status(200).json({ message: 'Login successful', driver });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Create a Ride
userRouter.post('/api/drivers/rides', async (req:Request, res:Response) => {
    const { driverId, destination, time } = req.body;
    const newRide = { id: Rides.length + 1, driverId, destination, time };
    Rides.push(newRide);
    res.status(201).json(newRide);
});

// Get Driver's Rides
userRouter.get('/api/drivers/rides', async (req: Request, res:Response) => {
    const { driverId } = req.query;
    const driverRides = Rides.filter(ride => ride.driverId === parseInt(driverId));
    res.status(200).json(driverRides);
});

// Update a Ride
userRouter.put('/api/drivers/rides/:rideId',async  (req:Request, res:Response) => {
    const { rideId } = req.params;
    const { destination, time } = req.body;
    const ride = ride.find((r: { id: number; }) => r.id === parseInt(rideId));
    if (ride) {
        ride.destination = destination || ride.destination;
        ride.time = time || ride.time;
        res.status(200).json(ride);
    } else {
        res.status(404).json({ message: 'Ride not found' });
    }
});



// Delete a ride by rideId
userRouter.delete('/api/drivers/rides/:rideId', async (req: Request, res: Response) => {
    const { rideId } = req.params;

        // Assuming you have a function to delete a ride from the database
        const ride = Rides.deleteOne({ _id: rideId });
        if (!ride) {
            // Ride not found
         res.status(404).json({ message: 'Ride not found' });
        }else {
            res.status(204).json();  // Successfully deleted
        }

       
       
        
});




export default userRouter;