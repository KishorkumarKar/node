import mongoose, { Schema, Document } from "mongoose";
import { ISchool } from "../interface/school.interface";
import * as commonUtil from "../util/common.util";

const schoolSchema: Schema<Document & ISchool> = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    school_id: {
      type: String,
      require: true,
      unique: true,
    },
    phone: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    start_time: {
      type: String,
      require: true,
    },
    /* end_time: {
            type: String,
            require: true
        }, */
    class_duration: {
      type: Number,
      require: true,
    },
    break_time: {
      type: Number,
      require: true,
    },
    break_time_started: {
      type: Number,
      require: true,
    },
    address: {
      street: {
        type: String,
        require: true,
      },
      city: {
        type: String,
        require: true,
      },
      pincode: {
        type: String,
        require: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

schoolSchema.pre("save", async function (next) {
  try {
    const school = this;
    if (school.isModified("start_time")) {
      school.start_time = commonUtil.timeConversion(school.start_time);
    }
    next();
  } catch (error: unknown) {
    if (error instanceof Error) {
      next(error);
    } else {
      next(new Error("Unknown error"));
    }
  }
});

type ToJSONTransform<T> = (
  doc: T,
  ret: T & { _id?: any; id?: any; __v?: number },
) => any;

schoolSchema.set("toJSON", {
  transform: ((_doc, returnedObj) => {
    returnedObj.id = returnedObj._id;
    if (returnedObj.start_time) {
      returnedObj.start_time = commonUtil.timeConversion(
        returnedObj.start_time,
        12,
      );
    }
    delete returnedObj._id;
    delete returnedObj.__v;
    return returnedObj;
  }) as ToJSONTransform<ISchool & Document>,
});

export default mongoose.model<Document & ISchool>("school", schoolSchema);
