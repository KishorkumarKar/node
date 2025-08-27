import { ISchool } from "../interface/school.interface";
import School from "../models/school.model";

/**
 * Add school
 * @param data
 * @returns
 */
export const add = async (data: ISchool) => {
  const school = new School(data);
  return await school.save();
};

export const list = async (limit: number, startFrom: number) => {
  const schoolObject = await School.find()
    .limit(limit)
    .skip(startFrom)
    .sort({ _id: -1 });
  const total = await School.countDocuments();
  return { school: schoolObject, total: total };
};
