import mongoose, { Schema, Document } from "mongoose";
import { IManageToken } from "../interface/manageToken.interface";
import config from "../config";

const manageTokenSchema: Schema<IManageToken & Document> = new mongoose.Schema(
  {
    type: {
      type: String,
      require: true,
    },
    token: {
      type: String,
      require: true,
    },
    created_at: {
      type: Date,
      default: Date.now(),
    },
    teacher_id: {
      type: mongoose.Schema.ObjectId,
    },
  },
  {
    timestamps: true,
  },
);

manageTokenSchema.index(
  { created_at: 1 },
  { expireAfterSeconds: config.tokenExpiryTime },
);
manageTokenSchema.index({ token: 1 });

type ToJSONTransform<T> = (
  doc: T,
  ret: Partial<T> & { _id?: any; id?: any; __v?: number },
) => any;

manageTokenSchema.set("toJSON", {
  transform: ((_doc, returnedObj) => {
    returnedObj.id = returnedObj._id;
    delete returnedObj._id;
    delete returnedObj.__v;
    return returnedObj;
  }) as ToJSONTransform<IManageToken & Document>,
});
export default mongoose.model<IManageToken & Document>(
  "manage_token",
  manageTokenSchema,
);
