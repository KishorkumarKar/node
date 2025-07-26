const amqp = require("amqplib");
const logger = require("./logger.utils");
let channel = "";
let exchange = process.env.RABBIT_MQ_EXCHANGE_POST;
let queue = "test_" + exchange;
const getConnection = async () => {
  try {
    const connect = await amqp.connect(process.env.RABBIT_MQ_HOST);
    channel = await connect.createChannel();
    await channel.assertExchange(exchange, "topic", { durable: false });
    await channel.assertQueue(queue, { durable: false });
    logger.info(`rabinMQ connected to URl ${process.env.RABBIT_MQ_HOST}`);
    return channel;
  } catch (error) {
    logger.error(error);
  }
};

const pushToQue = async (message, routeKey) => {
  try {
    if (!channel) {
      channel = await getConnection();
    }
    await channel.bindQueue(queue, exchange, routeKey);
    await channel.publish(
      exchange,
      routeKey,
      Buffer.from(JSON.stringify(message)),
    );
    logger.info({ message: "post queue inserted", ...message });
  } catch (error) {
    logger.error(error);
  }
};

module.exports = {
  getConnection,
  pushToQue,
};
