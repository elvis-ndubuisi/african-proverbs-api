import config from "config";
import log from "./logger.util";
import mongoose from "mongoose";

async function connectMongo() {
  // strictQuery Deprecation warning.
  mongoose.set("strictQuery", false);
  // Accounnt for reconnections
  try {
    const conn = await mongoose.connect(config.get<string>("dbUri"), {
      dbName: "african-proverbs",
    });
    log.info(`🚢 Connected to data source : ${conn.connection.port}`);
  } catch (error: any) {
    log.error(error?.message);
    process.exit(1);
  }
  // Account for disconnection - only after connection is made.
  mongoose.connection.on("disconnected", () => {
    log.warn("Disconnected from data source");
  });
}

export default connectMongo;
