import mongoose from "mongoose";
import environmentConfig from "./custom-environment-variables.config";

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(
      environmentConfig.MONGODB_CONNECTION_STRING,
    );
    console.log(
      "Database connected: ",
      connect.connection.host,
      connect.connection.name,
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectDb;
