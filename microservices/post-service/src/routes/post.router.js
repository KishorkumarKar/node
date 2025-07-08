const express = require("express");
const router = express.Router();
const { createPost } = require("../controllers/post.controller");

router.post("/create", createPost);
// router.delete('/delete:id');
// router.get('/all');

module.exports = router;
