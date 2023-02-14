import config from "config";
import nodemailer, { SendMailOptions } from "nodemailer";
import log from "./logger.util";

let transport =
  process.env.NODE_ENV === "development"
    ? nodemailer.createTransport({
        host: config.get<string>("mail_host"),
        port: config.get<number>("mail_port"),
        auth: {
          user: config.get("mail_user"),
          pass: config.get("mail_pass"),
        },
      })
    : nodemailer.createTransport({
        service: config.get<string>("mail_service"),
        auth: {
          user: config.get("mail_user"),
          pass: config.get("mail_pass"),
        },
      });

transport.verify((err, success) => {
  if (err) {
    log.error(err);
  } else {
    log.info(`📫 Server is ready to take messages`);
  }
});

// async function sendEmail(payload: SendMailOptions) {
//   transport.sendMail(payload, (err, info) => {
//     if (err) {
//       log.error(`Mail Error: ${err}`);
//       return;
//     }

//     log.debug(`Message sent:  ${info.messageId}`);
//   });
// }

async function sendEmail(payload: {
  to: string;
  subject: string;
  text: string;
  url: string;
}) {
  let mailOption: SendMailOptions = {
    from: `"African Proverbs Admin" <${config.get("mail_sender")}>`,
    to: payload.to,
    subject: payload.subject,
    text: payload.text,
    html: `<b>Hey there! </b><br> You are recieving this mail from African Proverbs </b><br> Please click here to <a href="${payload.url}">${payload.text}</a>`,
  };
  transport.sendMail(mailOption, (err, info) => {
    if (err) {
      log.error(`Mail Error: ${err}`);
      return;
    }

    log.debug(`Message sent:  ${info.messageId}`);
  });
}

export default sendEmail;
