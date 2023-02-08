"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const server_1 = require("@apollo/server");
const drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
const express4_1 = require("@apollo/server/express4");
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("config"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const connectMongo_util_1 = __importDefault(require("./utils/connectMongo.util"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const http_1 = __importDefault(require("http"));
const logger_util_1 = __importDefault(require("./utils/logger.util"));
const schema_1 = __importDefault(require("./graphql/schema"));
const resolvers_1 = __importDefault(require("./graphql/resolvers"));
const routes_1 = __importDefault(require("./routes"));
async function bootStrap() {
    // Build Schema
    // Init Express
    const app = (0, express_1.default)();
    const httpServer = http_1.default.createServer(app);
    app.use((0, helmet_1.default)());
    app.use((0, cookie_parser_1.default)());
    app.use(express_1.default.json());
    // Create the apollo server
    const server = new server_1.ApolloServer({
        typeDefs: schema_1.default,
        resolvers: resolvers_1.default,
        plugins: [(0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer })],
    });
    await server.start();
    // apply middleware to server
    app.use("/graphql", (0, cors_1.default)(), express_1.default.json(), (0, express4_1.expressMiddleware)(server));
    app.use(routes_1.default);
    const port = config_1.default.get("port") || 4000;
    // app.listen on express server
    await new Promise((resolve) => httpServer.listen({ port: port }, resolve));
    logger_util_1.default.info(`🚀 Server ready on port: ${port}`);
    // connect to mongodb
    await (0, connectMongo_util_1.default)();
}
bootStrap();
