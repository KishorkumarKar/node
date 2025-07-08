const express = require("express");
const router = express.Router();
const { createPost } = require("../controllers/post.controller");
const {
  postCreation,
} = require("../middlewares/validation/post.validation.middleware");

router.post("/create", postCreation, createPost);
// router.delete('/delete:id');
// router.get('/all');

module.exports = router;
