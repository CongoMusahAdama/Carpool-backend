import {Request, Response } from 'express';
import express from 'express';
import { Users } from '../modules/user.entity';
import { getRepository, getTreeRepository } from 'typeorm'; 
import bcrypt from 'bcrypt';
import jwt, {JwtPayload, Secret } from 'jsonwebtoken'
import dotenv from 'dotenv';

const router = express.Router();


// Load environment variables from .env file
dotenv.config();
const SECRET_KEY: Secret = process.env.SECRET_KEY || 'd0917835f596140fda75f078117295459778e8eae561ab5474ab54e13cce0123124d7145c32ec883c2a7838ef13026467b48f7305aae39c6cd198698385d681cbb1c8ac60bbb7086b111c5f900a88b40dbe069a21a5151786dcbde6ef36963f43a4bfed6a7f6dabbf91cb69cde77f5728f7e9f55e6e10af2ee1aa768fd7dd21ea3af53670c3f2b222f97b8d84673eff310d8dfc7c7081b03954161f2317775b2677420eb1143a14846eb3ca66e348fc97f33974561e845790c9b12465a7e325cc520044ebdcd32a3254ec23cfa9ab07f0ed2ae2ced32ba69d7399924fa107fba055284cbd49ed41593b6422f9267aed9b8f74b26d8c3ec1a406b23693ff089cc'; 

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a user
    const user = new Users();
    user.username = username;
    user.email = email;
    user.password = hashedPassword;

    // Save user to database
    await getRepository(Users).save(user);

    res.status(201).json({ message: "User  registered successfully" });
  } catch (error) {
    console.error('Error registering user', error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Login
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await getRepository(Users).findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Compare passwords
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid Credentials, please try again" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Middleware to verify JWT token
function verifyToken(req: Request, res: Response, next: () => void) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json ({ message: "Access Denied" });
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.body.user = decoded;
    console.log(req.body.user);

    next();
  } catch (error) {
    console.error("Error verifying token", error);
    res.status(401).json({ message: "Invalid Token" });
  }
}

// Verify token
router.get('/userinfo', verifyToken, async (req: Request, res: Response) => {
  try {
    const { userId } = req.body.user;
    const user = await getRepository(Users).findOneBy({ id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove sensitive information before storing the response
    const { password, ...userInfo } = user;
    res.json({ user: userInfo });
  } catch (error) {
    console.error("Error fetching user info:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;

