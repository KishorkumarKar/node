import { ISchool } from "../interface/school.interface";
import School from "../models/school.model";
import { AppError } from "../util/error.utils";

/**
 * Add school
 * @param data
 * @returns
 */
export const add = async (data: ISchool) => {
  const school = new School(data);
  return await school.save();
};

/**
 * To get ass school with limit
 * @param limit
 * @param startFrom
 * @returns
 */
export const list = async (limit: number, startFrom: number) => {
  const schoolObject = await School.find()
    .limit(limit)
    .skip(startFrom)
    .sort({ _id: -1 });
  const total = await School.countDocuments();
  return { school: schoolObject, total: total };
};

/**
 * to get school details by id
 * @param id
 * @returns
 */
export const getById = async (id: string) => {
  return await School.findById(id);
};

/**
 * delete school by id
 * @param id
 * @returns
 */
export const updateSchoolById = async (id: string, school: ISchool) => {
  const schoolObject = await getById(id);
  if (schoolObject) {
    schoolObject.set(school);
    return await schoolObject.save();
  } else {
    throw AppError.notFound(`Requested school doesn't exist`);
  }
};

/**
 * delete school by id
 * @param id
 * @returns
 */
export const deleteById = async (id: string) => {
  const school = await getById(id);
  if (school) {
    return await School.findByIdAndDelete(id);
  } else {
    throw AppError.forbidden(`Requested school doesn't exist`);
  }
};
