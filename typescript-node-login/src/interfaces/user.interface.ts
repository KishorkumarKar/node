import { Request } from "express";
import mongoose, { Types } from "mongoose";

export interface IAddress extends mongoose.Document {
  street: string;
  city: string;
  zipcode: string;
  country: string;
  _id: mongoose.Types.ObjectId;
}

export interface IUser extends Document {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  confirm_password: string;
  age: number;
  address: IAddress[];
}

export interface UserRequestBody<T> extends Request {
  body: T;
  user?: IUser;
}

export interface UserLoginBody<T> extends Request {
  body: T;
  user?: IUser;
}
