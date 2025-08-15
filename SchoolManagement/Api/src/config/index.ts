import dotenv from "dotenv";
import type { StringValue } from "ms";
process.env.NODE_ENV = process.env.NODE_ENV || "development";
const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  port: process.env.PORT,
  dbUrl: process.env.MONGOOSE || "",
  saltRound: Number(process.env.SALT_ROUND) || 10,
  jwtSecret: String(process.env.JWT_SECRET) || "secret",
  jwtExpiryTime: (process.env.JWT_EXPIRY || "1h") as StringValue,
};
