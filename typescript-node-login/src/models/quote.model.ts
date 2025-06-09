import mongoose from "mongoose";
import {
  IQuote,
  IQuoteAddressInterface,
  IQuoteProductInterface,
} from "../interfaces/quote.interface";

const quote = new mongoose.Schema<IQuote>(
  {
    status: {
      type: String,
      default: "active",
    },
    first_name: {
      type: String,
      required: false,
    },
    last_name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    age: {
      type: String,
      required: false,
    },
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    subtotal: {
      type: Number,
      required: false,
    },
    product: [
      {
        type: new mongoose.Schema<IQuoteProductInterface>({
          _id: {
            type: mongoose.Schema.Types.ObjectId,
            auto: true,
          },
          product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: [true, "Product Id is required"],
          },
          type_id: {
            type: String,
            default: "simple",
          },
          sku: {
            type: String,
            required: [false, "Product Sku is required"],
          },
          qty: {
            type: Number,
            required: [false, "qty is required"],
          },
          price: {
            type: Number,
            required: [true, "price is required"],
          },
        }),
      },
      {
        timestamps: true,
      },
    ],
    address: [
      {
        type: new mongoose.Schema<IQuoteAddressInterface>({
          _id: {
            type: mongoose.Schema.Types.ObjectId,
            auto: true,
          },
          customer_address_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User.Address",
            required: false,
          },
          address_type: {
            type: String,
            require: [true, "Please provide street"],
          },
          street: {
            type: String,
            require: [true, "Please provide street"],
          },
          city: {
            type: String,
            require: [true, "Please provide city"],
          },
          zipcode: {
            type: String,
            require: [true, "Please provide zipcode"],
          },
          country: {
            type: String,
            require: [true, "Please provide country"],
          },
        }),
      },
      {
        timestamps: true,
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default quote;
