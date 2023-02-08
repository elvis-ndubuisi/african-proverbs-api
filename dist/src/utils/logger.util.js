"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const log = winston_1.default.createLogger({
    format: winston_1.default.format.combine(winston_1.default.format.label({ label: " " }), winston_1.default.format.timestamp({ format: "DD-MM-YY HH:mm:ss" }), winston_1.default.format.printf((info) => `${info.label} [${info.level.toUpperCase()}] - ${info.timestamp} : ${[
        info.message,
    ]}`), winston_1.default.format.colorize({ all: true })),
    transports: [new winston_1.default.transports.Console()],
});
exports.default = log;
