const env = require("dotenv").config();
const express = require("express");
const connectDB = require("./config/mongoose.config");
const helmet = require("helmet");
const cors = require("cors");
// const amqplib = require('amqplib/callback_api');
// const queue = 'test tasks';
connectDB();
const media = require("./routes/media.routes");
const errorHandler = require("./middlewares/errorHandler.middleware");
const commonLoggerForRequest = require("./middlewares/commonLog.middleware");
const {
  connectAmqp: connectRabbitMQ,
  consumeMessage,
} = require("./utils/rabbitMq.util");
const app = express();

//-------------queue--------
// amqplib.connect('amqp://localhost', (err, conn) => {
//   if (err) throw err;

//   // Listener
//   conn.createChannel((err, ch2) => {
//     if (err) throw err;

//     ch2.assertQueue(queue);

//     ch2.consume(queue, (msg) => {
//       if (msg !== null) {
//         console.log(msg.content.toString());
//         ch2.ack(msg);
//       } else {
//         console.log('Consumer cancelled by server');
//       }
//     });
//   });
//    // Sender
//   conn.createChannel((err, ch1) => {
//     if (err) throw err;

//     ch1.assertQueue(queue);

//     setInterval(() => {
//       ch1.sendToQueue(queue, Buffer.from('something to do'));
//     }, 1000);
//   });
// });
//-------------queue--------

//middle ware
connectRabbitMQ();
consumeMessage();
app.use(helmet());
app.use(cors());
app.use(express.json());
//middle ware

const port = process.env.PORT || 3004;

app.use(commonLoggerForRequest);
app.use("/api/media", media);
app.get("/", (req, res) => res.send("media World!"));

app.use(errorHandler);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
