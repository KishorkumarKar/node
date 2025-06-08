import express from "express";
import { registerUser, loginUser } from "../controllers/userControllers";
import {
  userLoginValidation,
  userRegisterValidation,
} from "../middlewares/validation/User/userValidation.middleware";
const router = express.Router();
router.post("/login", userLoginValidation, loginUser);
router.post("/register", userRegisterValidation, registerUser);
export default router;
