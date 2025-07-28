const amqp = require("amqplib");
const logger = require("./logger.utility");
let connect = "";
let exchange = process.env.RABBIT_MQ_EXCHANGE;
// let exchange = "media_upload_kishor";
let routeKey = process.env.RABBIT_MQ_ROUT_KEY;
// let routeKey = "post";
let queue = "test_" + exchange;
// let queue = exchange;
const connectAmqp = async function () {
  try {
    const connection = await amqp.connect(process.env.RABBIT_MQ_URL);
    connect = await connection.createChannel();

    connect.on("error", (err) => {
      console.error("Channel error:", err);
    });
    // await connect.assertExchange(exchange, "topic", { durable: false });
    // await connect.assertQueue(queue, { durable: false });
    logger.info(`rabinMQ connected to URl ${process.env.RABBIT_MQ_URL}`);
    return connect;
  } catch (error) {
    logger.error({ error_message: "amqplib error", ...error });
  }
  return connect;
};

const pushData = async function (message) {
  try {
    if (!connect) {
      console.log("+++++++++++++++++++===aaa");
      connect = connectAmqp();
    }
    await connect.assertExchange(exchange, "topic", { durable: false });
    await connect.assertQueue(queue, { durable: false });
    await connect.bindQueue(queue, exchange, routeKey);
    await connect.publish(
      exchange,
      routeKey,
      Buffer.from(JSON.stringify(message)),
    );
    logger.info({ message: "queue inserted", ...message });
  } catch (error) {
    logger.error(error);
  }
};

const consumeMessage = async (queue, exchange, routeKey, callBack) => {
  try {
    if (!connect) {
      console.log("+++++++++++++++++++==sss=aaa");
      await connectAmqp();
    }
    await connect.bindQueue(queue, exchange, routeKey);
    await connect.consume(queue, function (msg) {
      callBack(msg);
      // console.log("======", msg.content.toString());
      connect.ack(msg);
    });
  } catch (error) {
    logger.error(error);
  }
};

module.exports = {
  connectAmqp,
  pushData,
  consumeMessage,
};
