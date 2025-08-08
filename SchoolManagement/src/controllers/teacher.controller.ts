import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import * as teacherService from "../service/teacher.service";

/**
 * TO add teacher
 * POST /V1/teacher/:id
 */
const addTeacher = expressAsyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const teacher = req.body;
    const teacherResponse = await teacherService.create(teacher);
    return res.status(200).json({ success: true, ...teacherResponse });
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
    return res.status(200).json({ success: true, message: "getTeacher" });
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

export { addTeacher, deleteTeacher, getTeacher, updateTeacher, getAllTeacher };
