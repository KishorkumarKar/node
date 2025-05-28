const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
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
        type: new mongoose.Schema({
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
  }
);

module.exports = mongoose.model("User", userSchema);
