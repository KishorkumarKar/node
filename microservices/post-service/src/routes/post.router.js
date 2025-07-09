const express = require("express");
const router = express.Router();
const {
  createPost,
  deletePost,
  getAllPost,
} = require("../controllers/post.controller");
const {
  postCreation,
} = require("../middlewares/validation/post.validation.middleware");

router.post("/create", postCreation, createPost);
router.delete("/delete/:id", deletePost);
router.get("/all", getAllPost);

module.exports = router;
