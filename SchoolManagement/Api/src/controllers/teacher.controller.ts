import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import * as teacherService from "../service/teacher.service";
import { AppError } from "../util/error.utils";
import { FlattenMaps, Document } from "mongoose";
import { getWebToken } from "../util/manage.password.utils";

/**
 * TO add teacher
 * POST /V1/teacher/
 */
const addTeacher = expressAsyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const teacher = req.body;
    if (await teacherService.getByEmail(teacher.email)) {
      throw AppError.dataExist(`Email Exist ${teacher.email}`);
    }
    const teacherResponse = await teacherService.create(teacher);
    return res.status(200).json({ success: true, ...teacherResponse });
  },
);

/**
 * TO add teacher
 * POST /V1/teacher/login
 */
const teacherLogin = expressAsyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { password, email } = req.body;
    const teacherObject = await teacherService.getByEmail(email);
    if (!teacherObject) {
      throw AppError.loginValidation(`Not a valid user ${email}`);
    }
    if (!(await teacherObject.comparePassword(password))) {
      throw AppError.loginValidation(`Invalid login password ${email}`);
    }
    const token = await getWebToken(teacherObject.toJSON());
    return res.status(200).json({ success: true, token: token });
  },
);

/**
 * TO Delete teacher
 * DELETE /V1/teacher/:id
 */
const deleteTeacher = expressAsyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    return res.status(200).json({ success: true, message: "deleteTeacher" });
  },
);

/**
 * forgot password
 * POST /V1/teacher/forgotpassword
 */
const forgotPassword = expressAsyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { email } = req.body;
    teacherService.generateForgetPasswordLink(email);
    return res
      .status(200)
      .json({
        success: true,
        message:
          "If it's a valid Email, mail has been triggered to respective email",
      });
  },
);

/**
 * TO Update teacher
 * PUT /V1/teacher/:id
 */
const updateTeacher = expressAsyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    return res.status(200).json({ success: true, message: "updateTeacher" });
  },
);

/**
 * TO GET teacher by id
 * GET /V1/teacher/:id
 */
const getTeacher = expressAsyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const id: string = req.params["id"];
    const teacherResponse = await teacherService.get(id);
    return res.status(200).json({ success: true, ...teacherResponse });
  },
);

/**
 * TO add all teacher
 * GET /V1/teacher/:id
 */
const getAllTeacher = expressAsyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    return res.status(200).json({ success: true, message: "getAllTeacher" });
  },
);

export {
  addTeacher,
  deleteTeacher,
  getTeacher,
  updateTeacher,
  getAllTeacher,
  teacherLogin,
  forgotPassword,
};
