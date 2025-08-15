import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config";
import { ITeacher } from "../interface/teacher.interface";

export const hashThePassword = (password: string): string => {
  const salt = bcrypt.genSaltSync(config.saltRound);
  return bcrypt.hashSync(password, salt);
};

export const comparePassword = (password: string, hash: string): boolean => {
  return bcrypt.compareSync(password, hash);
};

export const getWebToken = async (user: ITeacher): Promise<string> => {
  const data = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  console.log("ssss---", config.jwtSecret);
  return jwt.sign(data, config.jwtSecret, { expiresIn: config.jwtExpiryTime });
};
