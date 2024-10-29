/*registering a user
login user
getting all the users
getting a user by id
getting user profile by id
updating a user
deleting a user
*/ 
import { IsNull } from "typeorm";
import { getRepository } from "typeorm"; 
import { AppDataSource } from "../core/data-source";
import { User } from "../modules/user.entity";
import bcrypt, { compare } from "bcrypt";
import jwt from "jsonwebtoken";


export class UserService {
  static getUserById(userId: number){    //static
    throw new Error ("Method not implemented.");
  }
  static updateUserProfile(userId: number, updatedData: any){
    throw new Error("Method not implemented.");
  }
  static loginUser(email:any, password: any){
    throw new Error("Method not implemented.");
  }
  private userRepository = AppDataSource.getRepository(User);


  //REGISTER USER
  async registerUser(email: string, password: string, phoneNumber: string ) {
    //check if user already existed 
    const existingUser = await this.userRepository.findOne({ where: { email }});
    if (existingUser){
      throw new Error("User with this email already exists");
    }

    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create the user and save 
    const user = this.userRepository.create({ email, password: hashedPassword, phoneNumber });
    return await this.userRepository.save(user);
  }

  //LOGIN A USER
 async loginUser(email: string, password: string) {
    const userRepository = getRepository(User);
    
    // Find user by email, check if not deleted
    const user = await userRepository.findOne({ where: { email } });

    // Check if user exists
    if (!user) {
        throw new Error("User not found");
    }
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid password");
    }
    return {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        country: user.country,
        profilePicture: user.profilePicture,
    };
}



//GET ALL USERS
  async getAllUsers() {
    return await this.userRepository.find();
  }


  //GET USER BY ID
  async getUserById(id: number): Promise<User | null> {
    if (!id || isNaN(id)) {
        throw new Error("Invalid user ID");
    }

    try {
        const user = await this.userRepository.findOne({
            where: {
                id,
                deletedAt: IsNull(), // Ensures TypeScript handles deletedAt as nullable
            },
        });
        
        if (!user) {
            throw new Error("User not found");
        }
        
        return user;
    } catch (error) {
        console.error("Error retrieving user:", error);
        throw new Error("Error retrieving user");
    }
  }
 

//get user profile

  async getUserProfile(userId: number) {
    return await this.userRepository.findOne({ where: { id: userId } });
  }



  /*async updateUserProfile(userId: number, updatedData: Partial<User>) {
    await this.userRepository.update({ id: userId }, updatedData);
    return await this.getUserProfile(userId);
  }
}*/


async updateUser(id: number, updateData: Partial<User>): Promise<User | null> {
  if (!id || isNaN(id)) {
      throw new Error("Invalid user ID");
  }

  const user = await this.userRepository.findOne({ where: { id } });
  if (!user) {
      throw new Error("User not found");
  }

  // Update user fields as needed
  Object.assign(user, updateData);
  user.updatedAt = new Date();
  
  await this.userRepository.save(user);
  return user;
}


//delete a user

  async deleteUser(userId: number) {
    if (!userId) {
      throw new Error("User ID is required");
    }

    // Find the user by ID
    const user = await this.userRepository.findOne({ where: { id: userId } });
    
    if (!user) {
      throw new Error("User not found");
    }

    // Soft delete the user (assuming you have a deletedAt field for soft deletes)
    user.deletedAt = new Date(); // Set the deletedAt timestamp
    await this.userRepository.save(user); // Save the updated user entity

    return { message: "User deleted successfully" }; // Return a success message
  }
}

  


