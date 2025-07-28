const logger = require("../utils/logger.utils");
const { consumeMessage } = require("../utils/rabbitMq.utils");
const Search = require("../models/search.models");
const addPostConsumer = async (message) => {
  const {
    _id: postId,
    userId,
    content,
  } = JSON.parse(message.content.toString());

  console.log("============", userId);

  const search = new Search({
    postId,
    userId,
    content,
  });
  console.log("========aaa====", userId);
  const saveData = await search.save();
  logger.info({ message: "add Post", output: saveData });
};

const deletePostConsumer = async (message) => {
  logger.info({ message: "Delete Post", output: message });
};

const executePostConsumer = () => {
  const deletePostQue = process.env.RABBIT_MQ_EXCHANGE_POST;
  const deletePostRoutKey = process.env.RABBIT_MQ_ROUT_KEY_POST;
  const addPostQue = process.env.RABBIT_MQ_EXCHANGE_POST_ADD;
  const addPostRoutKey = process.env.RABBIT_MQ_ROUT_KEY_POST_ADD;
  consumeMessage(
    "test_" + deletePostQue,
    deletePostQue,
    deletePostRoutKey,
    deletePostConsumer,
  );
  consumeMessage(
    "test_" + addPostQue,
    addPostQue,
    addPostRoutKey,
    addPostConsumer,
  );
};

module.exports = executePostConsumer;
