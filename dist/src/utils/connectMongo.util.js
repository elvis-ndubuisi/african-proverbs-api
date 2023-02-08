"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("config"));
const logger_util_1 = __importDefault(require("./logger.util"));
const mongoose_1 = __importDefault(require("mongoose"));
async function connectMongo() {
    // strictQuery Deprecation warning.
    mongoose_1.default.set("strictQuery", false);
    // Accounnt for reconnections
    try {
        const conn = await mongoose_1.default.connect(config_1.default.get("dbUri"), {
            dbName: "african-proverbs",
        });
        logger_util_1.default.info(`🚢 Connected to data source : ${conn.connection.port}`);
    }
    catch (error) {
        logger_util_1.default.error(error?.message);
        process.exit(1);
    }
    // Account for disconnection - only after connection is made.
    mongoose_1.default.connection.on("disconnected", () => {
        logger_util_1.default.warn("Disconnected from data source");
    });
}
exports.default = connectMongo;
