import nodemailer, { SendMailOptions } from "nodemailer";
import log from "./logger";

// async function createTestCreds() {
//   try {
//     const creds = await nodemailer.createTestAccount();
//     console.log({ creds });
//   } catch (err: any) {
//     log.error(err);
//   }
// }
// createTestCreds();

const smtp: {
  user: string;
  pass: string;
  host: string;
  port: number;
  secure: boolean;
} = {
  user: "pzczsaaqrwrmmqeo@ethereal.email",
  pass: "WWw9WAKRJW5GGD1hUz",
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
};

const transporter = nodemailer.createTransport({
  ...smtp,
  auth: { user: smtp.user, pass: smtp.pass },
});

async function sendEmail(payload: SendMailOptions) {
  transporter.sendMail(payload, (err, info) => {
    if (err) {
      log.error(`mail error ${err}`);
      return;
    }

    log.info(`Preview url ${nodemailer.getTestMessageUrl(info)}`);
  });
}

export default sendEmail;
