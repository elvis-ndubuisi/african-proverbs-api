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
    ),
    winston.format.colorize({ all: true })
  ),
  transports: [new winston.transports.Console()],
});

export default log;
