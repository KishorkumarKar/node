import { Request, Response } from "express";
export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
}

export interface UserRequestBody<T> extends Request {
  body: T;
  user?: IUser;
}
