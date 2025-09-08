import express from "express";
const router = express.Router();
import * as classRoomController from "../controllers/classRoom.controller";
import * as classRoomMiddleware from "../middlewares/classRoom.middleware";

router
  .route("/")
  .get(classRoomController.list)
  .post(classRoomMiddleware.add, classRoomController.add);

export default router;
