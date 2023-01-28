import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import connectMongo from "./utils/connectMongo";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import http from "http";
import logger from "./utils/logger";
import schema from "./graphql/schema";
import resolvers from "./graphql/resolvers";
import routes from "./routes";

dotenv.config();

async function bootStrap() {
  // Build Schema
  // Init Express
  const app = express();
  const httpServer = http.createServer(app);

  app.use(helmet());
  app.use(express.json());
  // Create the apollo server
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  // apply middleware to server
  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server)
  );

  app.get("/", (req, res) => {
    res.send("okay");
  });

  app.use(routes);

  // app.listen on express server
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  logger.info(`🚀 Server ready`);
  // connect to mongodb
  await connectMongo();
}

bootStrap();
