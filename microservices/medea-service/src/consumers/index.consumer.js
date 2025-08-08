const postQue = require("./post.consumer");

const execute = async () => {
  postQue();
};

module.exports = execute;
