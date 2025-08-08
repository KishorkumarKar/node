const mongoose = require("mongoose");
const logger = require("../utils/logger.utils");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.CONNECTION_STRING, {
      useNewUrlParser: true,
    });
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error(`MongoDB Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
