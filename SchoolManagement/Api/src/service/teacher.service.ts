import { ITeacher } from "../interface/teacher.interface";
import Teacher from "../models/teacher.model";
import { AppError } from "../util/error.utils";

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

/**
 * To get teacher
 * @param id
 * @returns
 */
const get = async (id: any): Promise<ITeacher> => {
  let teacherObject = null;
  teacherObject = await Teacher.findById(id);
  if (!teacherObject) {
    throw AppError.notFound(`User Id not found ${id}`);
  }
  // return teacherObject.toJSON({ showPassword: true } as any);  // to get password
  return teacherObject.toJSON();
};

const getByEmail = async (email: string): Promise<ITeacher | undefined> => {
  let teacherObject = await Teacher.findOne({ email: email });
  return teacherObject?.toJSON();
};

export { getAll, create, get, getByEmail };
