import { ITeacher } from "../interface/teacher.interface";
import Teacher from "../models/teacher.model";
import ManageToken from "../models/manageToken.model";
import { AppError } from "../util/error.utils";
import { hashThePassword } from "../util/manage.password.utils";
import logger from "../util/logger.util";
import { emailSeder } from "./mail.service";
import schoolEvents from "../events/school.events";

/**
 * To get all teacher
 */
const getAll = async (limit: number, startFrom: number) => {
  const teacher = await Teacher.find()
    .limit(limit)
    .skip(startFrom)
    .sort({ _id: -1 });
  return teacher;
};

/**
 * To get all teacher
 */
const filterWithData = async (
  limit: number,
  startFrom: number,
  filterData: {},
) => {
  const filter = {
    $or: Object.entries(filterData).map(([key, value]) => ({
      [key]: { $regex: value, $options: "i" },
    })),
  };
  const teacher = await Teacher.find(filter)
    .limit(limit)
    .skip(startFrom)
    .sort({ _id: -1 });
  return teacher;
};

/**
 * To Add Teacher
 */
const create = async (teacher: ITeacher) => {
  let teacherObject = new Teacher(teacher);
  teacherObject = await teacherObject.save();
  return teacherObject.toObject();
};

/**
 * To get teacher
 * @param id
 * @returns
 */
const get = async (id: string) => {
  let teacherObject = null;
  teacherObject = await Teacher.findById(id);
  if (!teacherObject) {
    throw AppError.notFound(`User Id not found ${id}`);
  }
  // return teacherObject.toJSON({ showPassword: true } as any);  // to get password
  return teacherObject.toJSON();
};

/**
 * To remove teacher by id
 * @param id
 * @returns
 */
const remove = async (id: string) => {
  let teacherObject = null;
  teacherObject = await get(id);
  if (!teacherObject) {
    throw AppError.notFound(`User Id not found ${id}`);
  }
  return await Teacher.findByIdAndDelete(id);
};

const getByEmail = async (email: string) => {
  let teacherObject = await Teacher.findOne({ email: email });
  return teacherObject;
};

const getPassword = (passwordLength: number, hash: string): string => {
  var result = "";
  var characters = hash;
  var charactersLength = characters.length;
  for (var i = 0; i < passwordLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const generateForgetPasswordLink = async (email: string) => {
  const teacherObject = await getByEmail(email);
  if (teacherObject) {
    // teacherObject.toJSON();
    // const id=teacherObject.id
    const now = new Date();
    let token = `${teacherObject.id}-${now.toString()}`;
    logger.info(`Forgot Pass generator ${email}`);
    token = hashThePassword(token);

    const password = getPassword(6, token);
    teacherObject.set({
      password: password,
    });
    teacherObject.save();
    //----------Trigger Email------
    const subject = "Reset Password";
    emailSeder(email, subject, teacherObject.name, password);
    logger.info(`Teacher Password ${email} :- ${password}`);
    //----------Trigger Email------
    const manageToken = new ManageToken({
      teacher_id: teacherObject.id,
      token,
    });
    manageToken.save();
  }
};

schoolEvents.onEvent("schoolDeletedId", (msg) => {
  console.log("📢 School service heard myEvent ....:", msg);
});
schoolEvents.onEvent("schoolDeletedId", (msg) => {
  console.log("📢 School service heard myEvent ....00:", msg);
});
schoolEvents.onEvent("schoolDeletedIdCreated", (msg) => {
  console.log("📢 School service heard myEvent:", msg);
});

export {
  getAll,
  create,
  get,
  getByEmail,
  generateForgetPasswordLink,
  remove,
  filterWithData,
};
