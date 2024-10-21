import { Router , Request, Response } from "express";
import { Rides } from '../modules/rides.entity'
const apiRouter = Router();

//ride Endpoint
apiRouter.post('/rides', async (req:Request, res:Response)=>{
    const ride = req.body;
    ride.push(ride);
    res.status(201).json(ride);
});

apiRouter.get('/rides/:id', async  (req: Request, res:Response)=>{
    const ride = Rides.find((r: { id: string; }) => r.id === req.params.id);
    if(Rides){
        res.status(200).json(ride);
    }else{
        res.status(404).send('Ride not found' );
    }
});
apiRouter.get('/rides', async (req: Request, res:Response) =>{
    res.status(200).json(Rides);
});

// Booking Endpoints
apiRouter.post('/rides/:rideId/bookings',async (req: Request, res: Response)=> {
    const booking = { rideId: req.params.rideId, ...req.body };
    booking.push(booking);
    res.status(201).json(booking)
});


apiRouter.get('/rides/:rideId/bookings', async (req: Request, res:Response)=>{
    const rideBookings = Rides.filter((b: { rideId: string; })=> b.rideId === req.params.rideId);
    res.status(201).json(rideBookings);
});

export default apiRouter;



