import { Request, Response, NextFunction } from "express";
import { ISchool } from "../interface/school.interface";
import * as schoolValidation from "../validation/school.validation";
import logger from "../util/logger.util";
import { AppError } from "../util/error.utils";
import { verifyToken } from "../util/manage.password.utils";

export const add = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<object | void> => {
  const school: ISchool = req.body;
  const { error } = schoolValidation.add.validate(school);
  if (error) {
    logger.error(error);
    throw new AppError(error.details[0].message, 400);
  }
  return next();
};

/**
 * To validate token exist or not
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token: string | undefined = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return next(AppError.loginValidation("No token provided"));
  }
  try {
    const validToken = await verifyToken(token);
    req.headers["user"] = JSON.stringify(validToken);
    return next();
  } catch (error: unknown) {
    if (error instanceof Error) {
      return next(AppError.loginValidation(error.message));
    } else {
      return next(AppError.loginValidation("Invalid Token"));
    }
  }
};

/**
 * to validate user role has permission or not
 * @param role
 * @returns
 */
export const validateRole = (role: [string]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.headers["user"]
      ? JSON.parse(req.headers["user"] as string)
      : "";
    if (user && role.includes(user.role)) {
      return next();
    } else {
      return next(AppError.forbidden("Access Denied"));
    }
  };
};
