import express from "express";
import * as schoolController from "../controllers/school.controller";
import * as schoolMiddleWare from "../middlewares/school.middleware";
const route = express.Router();

// route.post("/add", schoolController.add);
route
  .route("/")
  .post(
    schoolMiddleWare.validateToken,
    schoolMiddleWare.validateRole(["teacher"]),
    schoolMiddleWare.add,
    schoolController.add,
  );

export default route;
