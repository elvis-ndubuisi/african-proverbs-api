import dotenv from "dotenv";
import log from "./logger";
import mongoose from "mongoose";

dotenv.config();

async function connect() {
  // strictQuery Deprecation warning.
  mongoose.set("strictPopulate", false);
  // Accounnt for reconnections
  mongoose.connection.on("reconnected", () => {
    log.info("Re-Connected to data source : Mongo");
  });
  try {
    const conn = await mongoose.connect(String(process.env.MONGO_URI), {
      dbName: "african-proverbs",
    });

    log.info(`Connected to data source : ${conn.connection.port}`);
  } catch (error: any) {
    log.error(error?.message);
    process.exit(1);
  }
  // Account for disconnection - only after connection is made.
  mongoose.connection.on("disconnected", () => {
    log.warn("Disconnected from data source");
  });
}

export default connect;
