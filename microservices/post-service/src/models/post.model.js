const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    content: {
      type: String,
      required: false,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    mediaId: [
      {
        type: String,
      },
    ],
  },
  {
    timeStamps: true,
  },
);
postSchema.index({ content: "text" });

const pots = mongoose.model("Post", postSchema);
module.exports = pots;
