const amqp = require("amqplib");
const logger = require("../utils/logger.utils");
const { url, queueName } = {
  url: "amqp://username:password@host:port",
  queueName: "test tasks",
};

const mediaCreateConsumer = async () => {
  try {
    const connection = await amqp.connect(process.env.RABBIT_MQ_HOST);
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, {
      durable: false,
    });
    channel.consume(
      queueName,
      async (message) => {
        const content = message.content.toString();
        logger.info("consumer response:- " + content);
        channel.ack(message);
      },
      {
        noAck: false, // Ensure acknowledgment if false it will not acknowledge
      },
    );
  } catch (error) {}
};

module.exports = mediaCreateConsumer;
