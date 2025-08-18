import nodemailer from "nodemailer";
import config from "../config";
import logger from "../util/logger.util";
import { forgotPassEmailTemplate } from "../util/emailTemplate.util";

const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: config.email.port,
  secure: false, // true for port 465, false for 587
  auth: {
    user: config.email.user, // Mailjet API Key
    pass: config.email.pass, // Mailjet Secret Key
  },
});
export const emailSeder = async (
  toEmail: string,
  subject: string,
  name: string,
  password: string,
) => {
  if (!config.email.disable_Email) {
    await transporter
      .sendMail({
        from: "developer.backend.mail1@gmail.com",
        to: toEmail,
        subject: subject,
        // text: "Hello, this is a test email using Mailjet SMTP.",
        html: forgotPassEmailTemplate(name, password),
      })
      .then((result) => {
        logger.info(result);
      })
      .catch((error) => {
        logger.error(error);
      });
  } else {
    logger.error(`Email Disable change on config`);
  }
};
