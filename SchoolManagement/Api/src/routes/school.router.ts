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
  )
  .get(
    schoolMiddleWare.validateToken,
    schoolMiddleWare.validateRole(["teacher"]),
    schoolController.getAll,
  );

route
  .route("/:id")
  .get(
    schoolMiddleWare.validateToken,
    schoolMiddleWare.validateRole(["teacher"]),
    schoolController.getById,
  )
  .delete(
    schoolMiddleWare.validateToken,
    schoolMiddleWare.validateRole(["teacher"]),
    schoolController.deleteById,
  )
  .put(
    schoolMiddleWare.validateToken,
    schoolMiddleWare.validateRole(["teacher"]),
    schoolMiddleWare.add,
    schoolController.update,
  );

export default route;
