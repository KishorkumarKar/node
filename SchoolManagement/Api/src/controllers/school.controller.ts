import expressAsyncHandler from "express-async-handler";
import { ISchool } from "../interface/school.interface";
import * as commonUtil from "../util/common.util";
import * as schoolService from "../service/school.service";
import { number } from "joi";

/**
 * to add school
 * POST : /V1/school/
 */
export const add = expressAsyncHandler(async (req, res) => {
  const school: ISchool = req.body;
  const schoolObject = await schoolService.add(school);
  res.status(200).json({
    success: true,
    ...schoolObject.toJSON(),
  });
});

/**
 * to get all school school
 * GET : /V1/school/
 * header : limit,page
 */
export const getAll = expressAsyncHandler(async (req, res) => {
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
});
