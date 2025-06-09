import mongoose, { Schema } from "mongoose";
import { IUser, IAddress } from "../interfaces/user.interface";

const userSchema = new mongoose.Schema<IUser>(
  {
    first_name: {
      type: String,
      required: [true, "Please add the user name"],
    },
    last_name: {
      type: String,
      required: [true, "Please add the user name"],
    },
    email: {
      type: String,
      required: [true, "Please add the user email address"],
      unique: [true, "Email address already taken"],
    },
    password: {
      type: String,
      required: [true, "Please add the user password"],
    },
    address: [
      {
        type: new mongoose.Schema<IAddress>({
          _id: {
            type: mongoose.Schema.Types.ObjectId,
            auto: true,
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

const User = mongoose.model<IUser>("User", userSchema);
export default User;
