import { AppDataSource } from "../core/data-source";
import { Ride } from "../modules/rides.entity";
import { User } from "../modules/user.entity";

export class RideService {
  private rideRepository = AppDataSource.getRepository(Ride);
  private userRepository = AppDataSource.getRepository(User);

  async searchRides(pickupLocation: string, dropoffLocation: string, date: Date) {
    return await this.rideRepository.find({
      where: { pickupLocation, dropoffLocation, date },
    });
  }

  async bookRide(userId: number, rideId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const ride = await this.rideRepository.findOne({ where: { id: rideId } });

    if (!user || !ride) {
      throw new Error("User or Ride not found");
    }

    // Here, you might add more logic, such as checking if the user has already booked, handling payments, etc.
    return { message: "Ride booked successfully", ride };
  }
}
