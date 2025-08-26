import { ISchool } from "../interface/school.interface";
import School from "../models/school.model";
export const add = async (data: ISchool) => {
  const school = new School(data);
  return await school.save();
};
