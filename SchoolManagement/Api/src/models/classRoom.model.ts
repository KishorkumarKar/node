import mongoose, { Schema, Document } from "mongoose";
import * as classRoomInterface from "../interface/classRoom.interface";
import * as commonUtil from "../util/common.util";

export interface IMClassroomDocument
  extends Omit<classRoomInterface.IClassroomDocument, "id">,
    Document {}
const periodSchema = new Schema<classRoomInterface.Period>({
  start: {
    type: String,
    required: true,
    match: [/^\d{2}:\d{2}$/, "Invalid time format (HH:MM)"],
  },
  end: {
    type: String,
    required: true,
    match: [/^\d{2}:\d{2}$/, "Invalid time format (HH:MM)"],
  },
  subject: { type: String, required: true, trim: true },
  teacher_id: {
    type: String,
    required: true,
    match: [/^teach_\d+$/, "Invalid teacher_id format"],
  },
});

const scheduleSchema = new Schema<classRoomInterface.Schedule>({
  day: {
    type: String,
    required: true,
    enum: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
  },
  periods: {
    type: [periodSchema],
    validate: {
      validator: (v: classRoomInterface.Period[]) =>
        Array.isArray(v) && v.length > 0,
      message: "At least one period required",
    },
  },
});

const subjectSchema = new Schema<classRoomInterface.Subject>({
  name: { type: String, required: true, trim: true },
  teacher_id: {
    type: String,
    required: true,
    // match: [/^teach_\d+$/, "Invalid teacher_id format"],
  },
});

const classRoomSchema = new Schema<IMClassroomDocument>(
  {
    school_id: {
      type: String,
      required: true,
      // match: [/^school_\d+$/, "Invalid school_id format"],
    },
    class_id: {
      type: String,
      required: true,
      match: [/^class_\d+$/, "Invalid class_id format"],
    },
    name: { type: String, required: true, trim: true },
    class_teacher: {
      type: String,
      required: true,
      // match: [/^teach_\d+$/, "Invalid class_teacher format"],
    },
    number_of_class: { type: Number, required: true, min: 1 },
    subjects: {
      type: [subjectSchema],
      validate: {
        validator: (v: classRoomInterface.Subject[]) =>
          Array.isArray(v) && v.length > 0,
        message: "At least one subject required",
      },
    },
    students: {
      type: [String],
      validate: {
        validator: (v: string[]) => v.every((id) => /^stu_\d+$/.test(id)),
        message: "Invalid student_id format",
      },
    },
    schedule: {
      type: [scheduleSchema],
      validate: {
        validator: (v: classRoomInterface.Schedule[]) =>
          Array.isArray(v) && v.length > 0,
        message: "At least one schedule entry required",
      },
    },
  },
  { timestamps: true },
);

//----------------change time format ------------
classRoomSchema.pre("validate", async function (next) {
  try {
    const classRoom = this;
    if (classRoom.isModified("schedule")) {
      classRoom.schedule.map((scheduleData, scheduleKey) => {
        scheduleData.periods.map((period, periodKey) => {
          classRoom.schedule[scheduleKey].periods[periodKey].end =
            commonUtil.timeConversion(period.end);
          classRoom.schedule[scheduleKey].periods[periodKey].start =
            commonUtil.timeConversion(period.start);
        });
      });
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

classRoomSchema.pre("save", async function (next) {
  try {
    const classRoom = this;
    /* if (classRoom.isModified("schedule")) {
            classRoom.schedule.map((scheduleData, scheduleKey) => {
                scheduleData.periods.map((period, periodKey) => {
                    classRoom.schedule[scheduleKey].periods[periodKey].end = commonUtil.timeConversion(period.end);
                    classRoom.schedule[scheduleKey].periods[periodKey].start = commonUtil.timeConversion(period.start);
                })
            })
        } */
    next();
  } catch (error: unknown) {
    if (error instanceof Error) {
      next(error);
    } else {
      next(new Error("Unknown error"));
    }
  }
});

//----------------change time format ------------

// ---------to format the data------
type ToJSONTransform<T> = (
  doc: T,
  ret: T & { _id?: any; id?: any; __v?: number },
) => any;

classRoomSchema.set("toJSON", {
  transform: ((_doc, returnedObj) => {
    returnedObj.id = returnedObj._id;
    if (returnedObj.schedule) {
      returnedObj.schedule.map((scheduleData, scheduleKey) => {
        scheduleData.periods.map((period, periodKey) => {
          returnedObj.schedule[scheduleKey].periods[periodKey].end =
            commonUtil.timeConversion(period.end, 12);
          returnedObj.schedule[scheduleKey].periods[periodKey].start =
            commonUtil.timeConversion(period.start, 12);
        });
      });
    }
    delete returnedObj._id;
    delete returnedObj.__v;
    return returnedObj;
  }) as ToJSONTransform<IMClassroomDocument>,
});
// ---------to format the data------

classRoomSchema.index({ school_id: 1, class_id: 1 }, { unique: true });
export default mongoose.model<IMClassroomDocument>(
  "Classroom",
  classRoomSchema,
);
