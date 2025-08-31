import expressAsyncHandler from "express-async-handler";
import { ISchool } from "../interface/school.interface";
import * as commonUtil from "../util/common.util";
import * as schoolService from "../service/school.service";
import { number } from "joi";
import { Request, Response } from "express";
import { AppError } from "../util/error.utils";

/**
 * to add school
 * POST : /V1/school/
 */
export const add = expressAsyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const school: ISchool = req.body;
    const schoolObject = await schoolService.add(school);
    res.status(200).json({
      success: true,
      ...schoolObject.toJSON(),
    });
  },
);

/**
 * to get all school school
 * GET : /V1/school/
 * header : limit,page
 */
export const getAll = expressAsyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    let { limit, page } = req.headers;
    let limitNumber: number = parseInt((limit ?? 10) as string, 10);
    let pageNumber: number = parseInt((page ?? 1) as string, 10);
    const schoolObject = await schoolService.list(
      limitNumber,
      (pageNumber - 1) * limitNumber,
    );
    res.status(200).json({
      success: true,
      page: pageNumber,
      total: schoolObject.total,
      schools: [...schoolObject.school],
    });
  },
);

/**
 * to get School
 * GET :- /V1/school/:id
 */
export const getById = expressAsyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const id = req.params["id"];
    const schoolObject = await schoolService.getById(id);
    if (schoolObject) {
      return res.status(200).json({
        success: true,
        ...schoolObject.toJSON(),
      });
    } else {
      throw AppError.notFound(`School Doesn't exist`);
    }
  },
);

/**
 * to Delete School
 * DELETE :- /V1/school/:id
 */
export const deleteById = expressAsyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const id = req.params["id"];
    const deleted = await schoolService.deleteById(id);
    if (deleted) {
      return res.status(200).json({
        success: true,
        message: "Requested School deleted",
      });
    } else {
      throw AppError.notFound(`School Doesn't exist`);
    }
  },
);

/**
 * to Update School
 * PUT :- /V1/school/:id
 */
export const update = expressAsyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const id = req.params["id"];
    const school: ISchool = req.body;
    const saveData = await schoolService.updateSchoolById(id, school);
    if (saveData) {
      return res.status(200).json({
        success: true,
        ...saveData.toJSON(),
      });
    } else {
      throw AppError.notFound(`School Doesn't exist`);
    }
  },
);

/**
 * filter school by name and code
 * PUT :- /V1/school/filter/:search
 */
export const filter = expressAsyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const search = req.params["search"];

    let { limit, page } = req.headers;
    let limitNumber: number = parseInt((limit ?? 10) as string, 10);
    let pageNumber: number = parseInt((page ?? 1) as string, 10);
    const filterData = await schoolService.filterData(
      limitNumber,
      (pageNumber - 1) * limitNumber,
      search,
    );
    res.status(200).json({
      success: true,
      page: pageNumber,
      total: filterData.total,
      schools: [...filterData.school],
    });
  },
);
