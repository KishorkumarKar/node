import mongoose from "mongoose";
import SchoolEvents from "../events/school.events";
import { IMassDelete, ISchool } from "../interface/school.interface";
import School from "../models/school.model";
import { AppError } from "../util/error.utils";
import logger from "../util/logger.util";

/**
 * Add school
 * @param data
 * @returns
 */
export const add = async (data: ISchool) => {
  const school = new School(data);

  SchoolEvents.emitEvent("schoolDeletedIdCreated", {
    id: school.id,
    name: school.name,
  });
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
    .select("-address -class_duration -break_time -break_time_started")
    .limit(limit)
    .skip(startFrom)
    .sort({ _id: -1 });
  const total = await School.countDocuments();
  return { school: schoolObject, total: total };
};

/**
 * To get ass school with limit
 * @param limit
 * @param startFrom
 * @returns
 */
export const filterData = async (
  limit: number,
  startFrom: number,
  filterWith: string,
) => {
  const filter = {
    $or: [
      { name: { $regex: filterWith, $options: "i" } },
      { school_id: { $regex: filterWith, $options: "i" } },
    ],
  };

  const schoolObject = await School.find(filter)
    .select("-address -class_duration -break_time -break_time_started")
    .limit(limit)
    .skip(startFrom)
    .sort({ _id: -1 });
  const total = await School.countDocuments(filter);
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
    const schoolDeleted = await School.findByIdAndDelete(id);
    if (schoolDeleted) {
      SchoolEvents.emitEvent("schoolDeletedId", id);
    }
    return schoolDeleted;
  } else {
    throw AppError.forbidden(`Requested school doesn't exist`);
  }
};

/**
 * delete multiple school with multiple id's
 * @param ids
 * @returns
 */
export const massDelete = async (ids: string[]) => {
  const objectIds = ids.map((id) => new mongoose.Types.ObjectId(id));
  const school = await School.find({ _id: { $in: objectIds } });
  if (school.length > 0) {
    const result = await School.deleteMany({ _id: { $in: objectIds } });
    logger.info(
      "Mass delete request for school",
      objectIds,
      result.deletedCount,
    );
    return result.deletedCount;
  } else {
    logger.error("Requested school doesn't exist ", objectIds);
    throw AppError.forbidden(`Requested school doesn't exist`);
  }
};
