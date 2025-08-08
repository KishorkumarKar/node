const mongoose = require("mongoose");
const mediaSchema = new mongoose.Schema(
  {
    public_id: {
      type: String,
      require: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      require: true,
    },
    url: {
      type: String,
      require: true,
    },
    fileName: {
      type: String,
      require: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timeStamps: true,
  },
);

const Media = mongoose.model("Media", mediaSchema);
module.exports = Media;
