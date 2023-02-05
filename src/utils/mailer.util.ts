import config from "config";
import nodemailer, { SendMailOptions } from "nodemailer";
import log from "./logger.util";

var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "d0c441a3a5191c",
    pass: "4c058c8b0bce7b",
  },
});

transport.verify((err, success) => {
  if (err) {
    log.error(err);
  } else {
    log.info(`📫 Server is ready to take messages`);
  }
});

async function sendEmail(payload: SendMailOptions) {
  transport.sendMail(payload, (err, info) => {
    if (err) {
      log.error(`Mail Error: ${err}`);
      return;
    }

    log.debug(`Message sent:  ${info.messageId}`);
  });
}

export default sendEmail;
