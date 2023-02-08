"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("config"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const logger_util_1 = __importDefault(require("./logger.util"));
let transport = nodemailer_1.default.createTransport({
    host: config_1.default.get("mail_host"),
    port: config_1.default.get("mail_port"),
    auth: {
        user: config_1.default.get("mail_user"),
        pass: config_1.default.get("mail_pass"),
    },
});
transport.verify((err, success) => {
    if (err) {
        logger_util_1.default.error(err);
    }
    else {
        logger_util_1.default.info(`📫 Server is ready to take messages`);
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
async function sendEmail(payload) {
    let mailOption = {
        from: `"African Proverbs Admin" <${config_1.default.get("mail_sender")}>`,
        to: payload.to,
        subject: payload.subject,
        text: payload.text,
        html: `<b>Hey there! </b><br> You are recieving this mail from African Proverbs </b><br> Please click here to <a href="${payload.url}">${payload.text}</a>`,
    };
    transport.sendMail(mailOption, (err, info) => {
        if (err) {
            logger_util_1.default.error(`Mail Error: ${err}`);
            return;
        }
        logger_util_1.default.debug(`Message sent:  ${info.messageId}`);
    });
}
exports.default = sendEmail;
