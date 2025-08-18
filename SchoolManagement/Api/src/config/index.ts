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
  tokenExpiryTime: (process.env.TOKEN_EXPIRY_TYME || 3600) as number,
  email: {
    host: (process.env.EMAIL_HOST || "in-v3.mailjet.com") as string,
    port: (process.env.EMAIL_PORT || 587) as number,
    user: (process.env.EMAIL_USER || "in-v3.mailjet.com") as string,
    pass: (process.env.EMAIL_PASS || "in-v3.mailjet.com") as string,
    disable_Email: true,
  },
};
