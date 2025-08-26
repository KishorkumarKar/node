import expressAsyncHandler from "express-async-handler";
import { ISchool } from "../interface/school.interface";
import * as commonUtil from "../util/common.util";
import * as schoolService from "../service/school.service";

export const add = expressAsyncHandler(async (req, res) => {
  const school: ISchool = req.body;
  const schoolObject = await schoolService.add(school);
  // const startTime = commonUtil.timeConversion(school.start_time);
  // const endTime = await commonUtil.getEndTime(startTime,8,30,45);
  res.status(200).json({
    success: true,
    ...schoolObject.toJSON(),
  });
});
