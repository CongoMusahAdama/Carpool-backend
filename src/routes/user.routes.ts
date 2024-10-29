import { Router } from "express";
import { registerUser, loginUser, updateUserProfile, getAllUsers, deleteUser, getUserById , getUserProfile} from "../controllers/userControllers";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", getAllUsers);  
router.get("/userS/:id", getUserById )          
router.get("/users/:id", getUserProfile);
router.put("/users/:id", updateUserProfile);
router.delete("/users/:id", deleteUser)

export default router;




