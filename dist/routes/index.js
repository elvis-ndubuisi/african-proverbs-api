"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const proverb_routes_1 = __importDefault(require("./proverb.routes"));
const admin_routes_1 = __importDefault(require("./admin.routes"));
const auth_router_1 = __importDefault(require("./auth.router"));
const submit_route_1 = __importDefault(require("./submit.route"));
const error_middleware_1 = __importDefault(require("../middlewares/error.middleware"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("config"));
const router = express_1.default.Router();
/* Health check routes */
router.get("/healthcheck", (_, res) => res.sendStatus(200));
router.use((0, cors_1.default)({ origin: config_1.default.get("origin") }), auth_router_1.default);
router.use((0, cors_1.default)({ origin: config_1.default.get("origin") }), admin_routes_1.default);
router.use(submit_route_1.default);
router.use(proverb_routes_1.default);
router.get("*", (_, res, next) => {
    next(res.status(400).send("Resource not found"));
});
router.use(error_middleware_1.default);
exports.default = router;
