import { Request } from "express";

export interface IProduct extends Document {
  type_id: string;
  sku: string;
  qty: number;
  price: number;
  image: string;
}

export interface IProductRequest<T> extends Request {
  body: T;
}
