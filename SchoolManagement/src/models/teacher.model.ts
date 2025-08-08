import { any, string } from "joi";
import mongoose, {
  Schema,
  Document,
  CallbackWithoutResultAndOptionalError,
} from "mongoose";
import { ITeacher } from "../interface/teacher.interface";

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
const Teacher = mongoose.model<ITeacher & Document>("Teacher", teacherSchema);

export default Teacher;
