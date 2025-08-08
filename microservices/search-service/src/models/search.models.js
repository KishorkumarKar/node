const mongoose = require("mongoose");

const searchSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "user",
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      unique: true,
      ref: "post",
    },
    content: {
      type: String,
      require: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timeStamps: true,
  },
);

searchSchema.index({
  content: "text",
});
searchSchema.index({
  createdAt: -1,
});

const Search = mongoose.model("Search", searchSchema);

module.exports = Search;
