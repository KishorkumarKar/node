const mongoose = require("mongoose");
const logger = require("../utils/logger.utils");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    logger.info(`MongoDB Connected: ${connect.connection.host}`);
  } catch (error) {
    logger.error(error);
  }
};
module.exports = connectDB;
