const amqp = require("amqplib/callback_api");
const logger = require("./logger.utility");
const queue = "test tasks";

const sendToQueue = async (message) => {
  try {
    amqp.connect("amqp://localhost", async (err, conn) => {
      logger.info({ loggerMessage: "publish Data:", ...message });
      logger.error({ loggerMessage: "createChannel error:", errorData: err });
      if (conn) {
        conn.createChannel(async (error, channel) => {
          logger.error({
            loggerMessage: "createChannel error:",
            errorData: error,
          });
          if (channel) {
            await channel.assertQueue(queue, { durable: false });
            channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
              persistent: true,
            });
            logger.info({ message: "Message sent:", ...message });
            await channel.close();
          }
        });
      }
    });
  } catch (error) {
    logger.error(error);
  }
};

module.exports = {
  sendToQueue,
};
