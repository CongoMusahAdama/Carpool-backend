import { Router } from "express";
import { searchRides, bookRide } from "../controllers/ridesControllers";

const router = Router();

router.get("/search", searchRides);
router.post("/book", bookRide);

export default router;
