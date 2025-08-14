import { any, string } from "joi";
import mongoose, {
  Schema,
  Document,
  CallbackWithoutResultAndOptionalError,
} from "mongoose";
import { ITeacher } from "../interface/teacher.interface";

// Generic helper type for Mongoose toJSON transform
type ToJSONTransform<T> = (
  doc: T,
  ret: Partial<T> & { _id?: any; id?: any; __v?: number },
  options: Record<string, any>,
) => any;

const teacherSchema: Schema<ITeacher & Document> = new mongoose.Schema(
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
  // try {
  //     if (!this.isModified("password")) return next();
  //     next()
  // } catch (error: unknown) {
  //     if (error instanceof Error) {
  //         next(error);
  //     } else {
  //         next(new Error("Unknown error"));
  //     }
  // }

  const teacher = this;
  if (teacher.isModified("password")) {
    // teacher.password = await bcrypt.hash(teacher.password, 8);
    teacher.password = "test.aaaa";
  }
  next();
});

teacherSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  try {
    return true;
    // return await bcrypt.compare(candidatePassword, this.password);
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
  }) as ToJSONTransform<ITeacher & Document>,
});
const Teacher = mongoose.model<ITeacher & Document>("Teacher", teacherSchema);

export default Teacher;
