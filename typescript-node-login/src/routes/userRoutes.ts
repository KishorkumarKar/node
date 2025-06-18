import express from "express";
import { registerUser, loginUser } from "../controllers/userControllers";
import {
  userLoginValidation,
  userRegisterValidation,
} from "../middlewares/validation/User/userValidation.middleware";
import { createBasicRateLimiting } from "../middlewares/rateLimiting.middleware"; //this is use to limit call by user
const router = express.Router();
router.post(
  "/login",
  createBasicRateLimiting({
    limit: 15,
    time: 30 * 1000,
    message: "U have excide the login limit try after some time",
  }),
  userLoginValidation,
  loginUser,
);
router.post("/register", userRegisterValidation, registerUser);
export default router;
