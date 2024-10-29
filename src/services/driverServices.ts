import { AppDataSource } from "../core/data-source";
import { Driver } from "../modules/driver.entity";
import { Ride } from "../modules/rides.entity";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class DriverService {
  private driverRepository = AppDataSource.getRepository(Driver);
  private rideRepository = AppDataSource.getRepository(Ride);

  async registerDriver(data: Partial<Driver>) {
    const driver = this.driverRepository.create(data);
    return await this.driverRepository.save(driver);
  }

  async loginDriver(email: string, password: string) {
    const driver = await this.driverRepository.findOne({ where: { email } });
    if (driver && (await bcrypt.compare(password, driver.password))) {
      const token = jwt.sign({ driverId: driver.id }, process.env.JWT_SECRET_KEY as string, { expiresIn: "1h" });
      return { token };
    }
    throw new Error("Invalid credentials");
  }

  async createRide(driverId: number, rideData: Partial<Ride>) {
    const driver = await this.driverRepository.findOne({ where: { id: driverId } });
    if (!driver) throw new Error("Driver not found");

    const ride = this.rideRepository.create({ ...rideData, driver });
    return await this.rideRepository.save(ride);
  }

  async getDriverRides(driverId: number) {
    return await this.rideRepository.find({ where: { driver: { id: driverId } } });
  }

  async updateRide(rideId: number, rideData: Partial<Ride>) {
    const ride = await this.rideRepository.findOne({ where: { id: rideId } });
    if (!ride) throw new Error("Ride not found");

    Object.assign(ride, rideData);
    return await this.rideRepository.save(ride);
  }

  async deleteRide(rideId: number) {
    const ride = await this.rideRepository.findOne({ where: { id: rideId } });
    if (!ride) throw new Error("Ride not found");

    await this.rideRepository.remove(ride);
    return { message: "Ride deleted successfully" };
  }



  async getDriverProfile(driverId: number) {
    return await this.driverRepository.findOne({ where: { id: driverId } });
  }
}







  

  

  

  


