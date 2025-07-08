const asyncHandler = require("express-async-handler");
const Post = require("../models/post.model");
const logger = require("../utils/logger.utils");
/**
 * Create Post
 * type: Post /app/post/create
 */
const createPost = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const userId = req.headers["x-user-id"];
  logger.info(content);
  logger.info(req.headers["x-user-id"]);

  const postSchema = new Post({
    content,
    userId,
  });
  const post = await postSchema.save();
  res.status(200).json(post);
});

module.exports = {
  createPost,
};
