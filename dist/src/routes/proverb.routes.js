"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("config"));
const proverbs_controller_1 = require("../controllers/proverbs.controller");
const deserializeAdmin_middleware_1 = __importDefault(require("../middlewares/deserializeAdmin.middleware"));
const getAdmin_middleware_1 = __importDefault(require("../middlewares/getAdmin.middleware"));
const validateResource_middleware_1 = __importDefault(require("../middlewares/validateResource.middleware"));
const proverb_schema_1 = require("../schemas/proverb.schema");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const router = express_1.default.Router();
const apiLimiter = (0, express_rate_limit_1.default)({
    windowMs: 1 * 60 * 1000,
    max: 6,
    standardHeaders: true,
    legacyHeaders: false,
    message: "Too many requests, try again after 5 minutes.",
});
router.get("/api/proverb", [(0, cors_1.default)(), apiLimiter], proverbs_controller_1.getProverbHandler);
router.post("/api/proverb/filter", [(0, cors_1.default)(), apiLimiter], (0, validateResource_middleware_1.default)(proverb_schema_1.proverbFilterQuerySchema), proverbs_controller_1.filterProverbHandler);
router.get("/api/proverb/today", apiLimiter, proverbs_controller_1.todayProverbHandler);
// Private routes
router.use((0, cors_1.default)({ origin: config_1.default.get("origin") }));
router.use(deserializeAdmin_middleware_1.default);
router.use(getAdmin_middleware_1.default);
router.post("/api/proverb", (0, validateResource_middleware_1.default)(proverb_schema_1.createNewProverbSchema), proverbs_controller_1.createNewProverbHandler);
router.post("/api/proverb/proverbs", proverbs_controller_1.createProverbsHandler);
router.delete("/api/proverb/delete", (0, validateResource_middleware_1.default)(proverb_schema_1.proverbIdQuerySchema), proverbs_controller_1.deleteProverbHandler);
router.patch("/api/proverb/modify", (0, validateResource_middleware_1.default)(proverb_schema_1.proverbIdQuerySchema), proverbs_controller_1.editProverbHandler);
exports.default = router;
