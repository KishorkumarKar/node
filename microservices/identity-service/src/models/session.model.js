const mongoose = require("mongoose");

const loginSessionSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refer: "User",
    },
    expiryTime: {
      type: Date,
      required: true,
    },
  },
  {
    timeStamps: true,
  },
);
loginSessionSchema.index({ expiryTime: 1 }, { expireAfterSeconds: 0 }); // TTL (Time To Live) this is to delete record automatically

const LoginSession = mongoose.model("LoginSession", loginSessionSchema);
module.exports = LoginSession;
