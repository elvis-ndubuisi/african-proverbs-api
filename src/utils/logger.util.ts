import winston from "winston";

const log = winston.createLogger({
  format: winston.format.combine(
    winston.format.label({ label: " " }),
    winston.format.timestamp({ format: "DD-MM-YY HH:mm:ss" }),
    winston.format.printf(
      (info) =>
        `${info.label} [${info.level.toUpperCase()}] - ${info.timestamp} : ${[
          info.message,
        ]}`
    )
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ level: "error", filename: "error.log" }),
  ],
});

export default log;
