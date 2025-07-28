const amqp = require("amqplib");
const logger = require("./logger.utils");
let channel = "";
let exchange = process.env.RABBIT_MQ_EXCHANGE_POST;
let queue = "test_" + exchange;
const getConnection = async () => {
  try {
    const connect = await amqp.connect(process.env.RABBIT_MQ_HOST);
    channel = await connect.createChannel();

    connect.on("error", (err) => {
      console.error("Channel error:", err);
    });
    // await channel.assertExchange(exchange, "topic", { durable: false });
    // await channel.assertQueue(queue, { durable: false });
    logger.info(`rabinMQ connected to URl ${process.env.RABBIT_MQ_HOST}`);
    return channel;
  } catch (error) {
    logger.error(error);
  }
};

const consumeMessage = async (queue, exchange, routeKey, callBack) => {
  try {
    if (!channel) {
      console.log("+++++++++++++++++++==sss=aaa");
      await getConnection();
    }

    console.log("+++++++", queue, exchange);

    await channel.bindQueue(queue, exchange, routeKey);
    await channel.consume(queue, function (msg) {
      callBack(msg);
      // console.log("======", msg.content.toString());
      channel.ack(msg);
    });
  } catch (error) {
    logger.error(error);
  }
};

module.exports = {
  getConnection,
  consumeMessage,
};
