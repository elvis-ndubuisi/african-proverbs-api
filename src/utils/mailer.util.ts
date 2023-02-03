import config from "config";
import nodemailer, { SendMailOptions } from "nodemailer";
import log from "./logger.util";

// async function createTestCreds() {
//   try {
//     const creds = await nodemailer.createTestAccount();
//     console.log({ creds });
//   } catch (err: any) {
//     log.error(err);
//   }
// }
// createTestCreds();

const smtp = config.get<{
  user: string;
  pass: string;
  host: string;
  port: number;
  secure: boolean;
}>("smtp");

const transporter = nodemailer.createTransport({
  ...smtp,
  auth: { user: smtp.user, pass: smtp.pass },
});

async function sendEmail(payload: SendMailOptions) {
  transporter.sendMail(payload, (err, info) => {
    if (err) {
      log.error(`Mail Error: ${err}`);
      return;
    }

    log.info(`Preview url ${nodemailer.getTestMessageUrl(info)}`);
  });
}

export default sendEmail;
