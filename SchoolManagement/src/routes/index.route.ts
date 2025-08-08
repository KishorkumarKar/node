import { Application } from "express";
import teacher from "./teacher.route";
const routeManagement = (app: Application) => {
  app.use("/V1/teacher", teacher);
};

export default routeManagement;
