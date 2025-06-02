import express from "express";
import { registerUser } from "../controllers/userControllers";
import { userLoginValidation } from "../middlewares/validation/User/userValidation.middleware";
const router = express.Router();
router.post("/register", userLoginValidation, registerUser);
export default router;
