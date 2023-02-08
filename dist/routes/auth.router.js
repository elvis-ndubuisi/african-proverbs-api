"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateResource_middleware_1 = __importDefault(require("../middlewares/validateResource.middleware"));
const auth_schema_1 = require("../schemas/auth.schema");
const auth_controller_1 = require("../controllers/auth.controller");
const router = express_1.default.Router();
router.post("/api/sessions", (0, validateResource_middleware_1.default)(auth_schema_1.createSessionSchema), auth_controller_1.createSessionHandler);
router.post("/api/sessions/refresh", auth_controller_1.refreshAccessTokenHandler);
exports.default = router;
