import { Application } from "express";
import connect from "./mongoose.loader";
import express from "./express.loader";

const loader = async (app: Application) => {
  connect();
  express(app);
};

export default loader;
