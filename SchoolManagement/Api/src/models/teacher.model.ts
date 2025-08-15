import { any, string } from "joi";
import mongoose, {
  Schema,
  Document,
  CallbackWithoutResultAndOptionalError,
} from "mongoose";
import { ITeacher } from "../interface/teacher.interface";
import {
  comparePassword as bcryptComparePassword,
  hashThePassword,
} from "../util/manage.password.utils";

// Generic helper type for Mongoose toJSON transform
type ToJSONTransform<T> = (
  doc: T,
  ret: Partial<T> & { _id?: any; id?: any; __v?: number },
  options: Record<string, any>,
) => any;

interface TeacherDocs extends Omit<ITeacher, "id">, mongoose.Document {
  comparePassword(plainPassword: string): Promise<boolean>;
}

const teacherSchema: Schema<TeacherDocs> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    class: {
      type: Array,
    },
  },
  {
    timestamps: true,
  },
);

teacherSchema.pre("save", async function (next) {
  try {
    const teacher = this;
    if (teacher.isModified("password")) {
      teacher.password = hashThePassword(teacher.password);
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

teacherSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  try {
    return bcryptComparePassword(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

teacherSchema.set("toJSON", {
  transform: ((_doc, returnedObj, option) => {
    // Make sure not to export password and change default _id to id
    if (!option.showPassword) {
      delete returnedObj.password;
    }
    returnedObj.id = returnedObj._id;
    delete returnedObj._id;
    delete returnedObj.__v;

    return returnedObj;
  }) as ToJSONTransform<TeacherDocs & Document>,
});
const Teacher = mongoose.model<TeacherDocs & Document>(
  "Teacher",
  teacherSchema,
);

export default Teacher;
