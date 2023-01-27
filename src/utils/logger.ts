import winston from "winston";

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6,
};
const colors = {
  error: "red",
  warn: "yellow",
  info: "bold green",
  http: "blue",
  verbose: "cyan",
  debug: "magenta",
  silly: "gray",
};

const log = winston.createLogger({
  format: winston.format.combine(
    winston.format.label({ label: `SR` }),
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
