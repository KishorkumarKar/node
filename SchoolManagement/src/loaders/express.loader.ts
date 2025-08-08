import express, { Application } from "express";
import helmet from "helmet";
import cors from "cors";
import indexRouter from "../routes/index.route";
import errorHandlerMiddleware from "../middlewares/errorHandler.middleware";

// teacher

export default async (app: Application) => {
  //middle ware
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  //middle ware

  //router
  indexRouter(app);
  //router

  app.use(errorHandlerMiddleware);
};
