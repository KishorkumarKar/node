const amqp = require("amqplib");
const logger = require("./logger.utils");
let channel = "";
let defaultExchange = process.env.RABBIT_MQ_EXCHANGE_POST;
let defaultQueue = "test_" + defaultExchange;
const getConnection = async () => {
  try {
    const connect = await amqp.connect(process.env.RABBIT_MQ_HOST);
    channel = await connect.createChannel();

    connect.on("error", (err) => {
      console.error("Channel error:", err);
    });
    logger.info(`rabinMQ connected to URl ${process.env.RABBIT_MQ_HOST}`);
    return channel;
  } catch (error) {
    logger.error(error);
  }
};

const pushToQue = async (
  message,
  routeKey,
  queue = defaultQueue,
  exchange = defaultExchange,
) => {
  console.log("========sssss====", exchange, queue, routeKey);
  try {
    if (!channel) {
      channel = await getConnection();
    }

    console.log("============", exchange, queue, routeKey);

    await channel.assertExchange(exchange, "topic", { durable: false });
    await channel.assertQueue(queue, { durable: false });
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
