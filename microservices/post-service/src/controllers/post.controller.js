const asyncHandler = require("express-async-handler");
const Post = require("../models/post.model");
const logger = require("../utils/logger.utils");
const { pushToQue } = require("../utils/rabbitMq.utils");
/**
 * Create Post
 * type: Post /app/post/create
 */
const createPost = asyncHandler(async (req, res) => {
  const { content, mediaId } = req.body;
  const userId = req.headers["x-user-id"];
  logger.info(content);
  logger.info(req.headers["x-user-id"]);

  const postSchema = new Post({
    content,
    userId,
    mediaId,
  });
  const post = await postSchema.save();
  return res.status(200).json(post);
});

/**
 * Delete post
 * type: delete /app/post/delete:id
 */
const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.headers["x-user-id"];
  const post = await Post.findOne({ _id: id, userId: userId });
  if (post) {
    pushToQue(post.toObject(), "delete_post");

    return res.status(201).json({
      message: "Post deleted " + id,
      success: true,
    });

    // const deletePost = await Post.findOneAndDelete({ _id: id, userId: userId });
    // if (deletePost) {
    //   return res.status(201).json({
    //     message: "Post deleted " + id,
    //     success: true,
    //   });
    // }
  }
  res.status(401);
  throw new Error(`Invalid Post Id ${id}`);
});

/**
 * Get all post
 * type: GET /app/post/all
 */
const getAllPost = asyncHandler(async (req, res) => {
  const userId = req.headers["x-user-id"];
  const pageSize = req.headers["pagesize"] || 5;
  const pageNumber = req.headers["pagenumber"] || 1;
  const startFrom = pageSize * (pageNumber - 1);
  const postData = await Post.find({ userId: userId })
    .sort({ _id: -1 })
    .skip(startFrom)
    .limit(pageSize);

  const totalNoOfPosts = await Post.countDocuments();
  const result = {
    postData,
    page: pageNumber,
    pageSize: pageSize,
    totalNoOfPosts: totalNoOfPosts,
  };
  res.json(result);
});

module.exports = {
  createPost,
  deletePost,
  getAllPost,
};
