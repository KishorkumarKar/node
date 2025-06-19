import { Request, Response, NextFunction } from "express";

const customLoggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const time = new Date().toISOString();
  const { path, method } = req;
  const userAgent = req.get("User-Agent");
  console.log(`${time} ${method} ${path} ${userAgent}`);
  return next();
};

export default customLoggerMiddleware;
