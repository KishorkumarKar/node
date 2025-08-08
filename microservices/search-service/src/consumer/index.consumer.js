const executePostConsumer = require("./post.consumer");

const executeConsumer = () => {
  executePostConsumer();
};

module.exports = executeConsumer;
