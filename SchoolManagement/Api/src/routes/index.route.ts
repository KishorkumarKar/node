import { Application } from "express";
import teacher from "./teacher.route";
import school from "./school.router";
const routeManagement = (app: Application) => {
  app.use("/V1/teacher", teacher);
  app.use("/V1/school", school);
};
export default routeManagement;
