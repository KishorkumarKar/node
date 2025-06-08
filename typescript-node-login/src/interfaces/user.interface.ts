import { Request, Response } from "express";
export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  confirm_password: string;
  age: number;
}

export interface UserRequestBody<T> extends Request {
  body: T;
  user?: IUser;
}

export interface UserLoginBody<T> extends Request {
  body: T;
  user?: IUser;
}
