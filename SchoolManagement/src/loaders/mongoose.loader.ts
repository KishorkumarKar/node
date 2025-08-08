import mongoose from "mongoose";
import config from "../config";
import logger from "../util/logger.util";

const dbConnect = async (): Promise<void> => {
  mongoose
    .connect(config.dbUrl)
    .then(() => logger.info("MongoDB connected" + config.dbUrl))
    .catch((err) => logger.error("MongoDB connection error:", err));
};

export default dbConnect;
