import mongoose from "mongoose";
import { IProduct } from "../interfaces/product.interface";
import { number } from "joi";

const productSchema = new mongoose.Schema<IProduct>(
  {
    type_id: {
      type: String,
      required: [true, "Type is required"],
    },
    sku: {
      type: String,
      required: [true, "Sku is required"],
    },
    qty: {
      type: Number,
      required: [true, "Qty is required"],
    },
    image: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
  },
  {
    timestamps: true,
  },
);

const Product =
  mongoose.models.product<IProduct> ||
  mongoose.model<IProduct>("product", productSchema);

export default Product;
