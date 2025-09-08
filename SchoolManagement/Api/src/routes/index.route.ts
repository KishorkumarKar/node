import { Application } from "express";
import teacher from "./teacher.route";
import school from "./school.router";
import classRoom from "./classRoom.router";
const routeManagement = (app: Application) => {
  app.use("/V1/teacher", teacher);
  app.use("/V1/school", school);
  app.use("/V1/class", classRoom);
};
export default routeManagement;
