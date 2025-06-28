import express, { Response } from "express";
import mongoose from "mongoose";
import { IAddress } from "./user.interface";
import { IProduct } from "./product.interface";

interface defaultQuote {
  first_name: string;
  last_name: string;
  email: string;
  age: string;
  customer_id: mongoose.Types.ObjectId;
  subtotal: number;
  address: IQuoteAddressInterface[];
  product: IQuoteProductInterface[];
}
export interface IQuoteProductInterface extends IProduct, mongoose.Document {
  product_id: mongoose.Types.ObjectId;
  _id: mongoose.Types.ObjectId;
}

export interface IQuoteAddressInterface extends IAddress, mongoose.Document {
  customer_address_id: mongoose.Types.ObjectId;
  address_type: string;
  _id: mongoose.Types.ObjectId;
}

export interface IQuote extends defaultQuote, mongoose.Document {
  status: string;
}
