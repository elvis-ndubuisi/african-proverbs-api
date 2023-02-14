require("dotenv").config();
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import config from "config";
import cookieParser from "cookie-parser";
import connectMongo from "./utils/connectMongo.util";
import express from "express";
import helmet from "helmet";
import http from "http";
import logger from "./utils/logger.util";
import schema from "./graphql/schema";
import resolvers from "./graphql/resolvers";
import routes from "./routes";

async function bootStrap() {
  // Build Schema
  // Init Express
  const app = express();
  const httpServer = http.createServer(app);

  app.use(helmet());
  app.use(cookieParser());
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
    cors<cors.CorsRequest>({ origin: "*" }),
    expressMiddleware(server)
  );

  app.use(routes);

  const port = config.get<string>("port") || 4000;
  // app.listen on express server
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: port }, resolve)
  );
  logger.info(`🚀 Server ready on port: ${port}`);
  // connect to mongodb
  await connectMongo();
}

bootStrap();
