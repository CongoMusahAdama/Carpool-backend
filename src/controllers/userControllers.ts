import { Request, Response } from "express";
import { UserService } from "../services/userServices";

const userService = new UserService();

//register a user
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, phoneNumber } = req.body;

    // Ensure all required fields are present
    if (!email || !password || !phoneNumber) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newUser = await userService.registerUser(email, password, phoneNumber);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error registering user:", error);  
    res.status(500).json({ message: "Failed to register User, email or password already existed", error });
  }
}

//login a user 
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
      const user = await UserService.loginUser(email, password);
      return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
      // Type assertion for the error to ensure TypeScript knows it has a message property
      const errorMessage = (error as Error).message || "Login failed";
      console.error(error);//log the error for debuging
      return res.status(400).json({ message: errorMessage });
  }
}

/**export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Input validation
  if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
  }

  try {
      const token = await UserService.loginUser(email, password);
      res.status(200).json({ message: "Login successful", token });
  } catch (error) {
      // Handling specific error for invalid credentials
      if (error === "Invalid credentials") {
          return res.status(401).json({ message: "Invalid credentials" });
      }
      // Handle unexpected errors
      console.error("Login error:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };*/


//get all users
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

//get user profile
export const getUserProfile = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  try {
    const user = await userService.getUserProfile(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

//get user by id
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
      // Parse ID to a number and handle invalid ID input
      const userId = parseInt(id, 10);
      if (isNaN(userId)) {
          return res.status(400).json({ message: "Invalid user ID" });
      }

      // Fetch user by ID
      const user = await UserService.getUserById(userId);

      res.status(200).json(user);
  } catch (error) {
      if (error === "User not found") {
          return res.status(404).json({ error });
      }

      // Log and return a general server error for unexpected issues
      console.error("Error in getUserById controller:", error);
      res.status(500).json({ message: "Error retrieving user" });
  }
};

/**export const getUserById = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);

  if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
      const user = await userService.getUserById(userId);
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
  } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
  }
};*/

//update a user
export const updateUserProfile = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  const updatedData = req.body;
  if (!userId) {
    return res.status(400).json({ message: "Invalid user ID" });
}
  try {
    const updatedUser = await userService.updateUser(userId, updatedData);
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json(error);
  }
};



//delete a user
export const deleteUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  try {
    const result = await userService.deleteUser(userId);
    res.json(result);
  } catch (error) {
    res.status(404).json({ message: "Unable to delete user" });
  }
};






