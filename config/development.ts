export default {
  shortSession: "30m",
  longSession: "1y",
  mail_host: process.env.DEV_MAIL_HOST,
  mail_port: process.env.DEV_MAIL_PORT,
  mail_user: process.env.DEV_MAIL_USER,
  mail_pass: process.env.DEV_MAIL_PASS,
  mail_sender: "testmailer.ie@gmail.com",
  host: "http://localhost:4000",
  secure_cookie: false,
};
