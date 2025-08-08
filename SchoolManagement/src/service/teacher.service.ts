import { ITeacher } from "../interface/teacher.interface";
import Teacher from "../models/teacher.model";

/**
 * To get all teacher
 */
const getAll = async () => {};

/**
 * To Add Teacher
 */
const create = async (teacher: ITeacher): Promise<ITeacher> => {
  let teacherObject = new Teacher(teacher);
  teacherObject = await teacherObject.save();
  return teacherObject.toObject();
};

export { getAll, create };
