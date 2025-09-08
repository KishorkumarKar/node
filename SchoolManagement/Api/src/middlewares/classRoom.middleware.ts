import { NextFunction, Request, Response } from "express";
import * as classRoomValidation from "../validation/classRoom.validation";
import { AppError } from "../util/error.utils";
import logger from "../util/logger.util";
export const add = (req: Request, res: Response, nex: NextFunction) => {
  const classRoom = req.body;
  const { error } = classRoomValidation.add.validate(classRoom);
  if (error) {
    logger.error(error);
    throw new AppError(error.details[0].message, 400);
  }
  return nex();
};
