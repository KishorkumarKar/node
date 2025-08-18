import { Request, Response, NextFunction } from "express";
import {
  addOrUpdate,
  login as teacherLogin,
  forgotPassword,
} from "../validation/teacher.validation";
import logger from "../util/logger.util";
import { AppError } from "../util/error.utils";
import {
  ITeacher,
  ITeacherLogin,
  ITeacherForgotPassword,
} from "../interface/teacher.interface";

const addTeacherValidation = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<object | void> => {
  const teacher: ITeacher = req.body;
  const { error } = addOrUpdate.validate(teacher);
  if (error) {
    logger.error(error);
    throw new AppError(error.details[0].message, 401);
  }
  return next();
};

const loginTeacherValidation = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<object | void> => {
  const teacher: ITeacherLogin = req.body;
  const { error } = teacherLogin.validate(teacher);
  if (error) {
    logger.error(error);
    throw new AppError(error.details[0].message, 401);
  }
  return next();
};

const forgotPasswordTeacherValidation = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<object | void> => {
  const teacher: ITeacherForgotPassword = req.body;
  const { error } = forgotPassword.validate(teacher);
  if (error) {
    logger.error(error);
    throw new AppError(error.details[0].message, 401);
  }
  return next();
};

export {
  addTeacherValidation,
  loginTeacherValidation,
  forgotPasswordTeacherValidation,
};
