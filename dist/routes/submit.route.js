"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("config"));
const submit_controller_1 = require("../controllers/submit.controller");
const validateResource_middleware_1 = __importDefault(require("../middlewares/validateResource.middleware"));
const submit_schema_1 = require("../schemas/submit.schema");
const getAdmin_middleware_1 = __importDefault(require("../middlewares/getAdmin.middleware"));
const deserializeAdmin_middleware_1 = __importDefault(require("../middlewares/deserializeAdmin.middleware"));
const router = express_1.default.Router();
router.post("/api/submit", (0, cors_1.default)(), (0, validateResource_middleware_1.default)(submit_schema_1.submitProverbSchema), submit_controller_1.submitProverbHandler);
router.get("/api/submit", [deserializeAdmin_middleware_1.default, getAdmin_middleware_1.default], submit_controller_1.getSubmittedProverbsHandler);
router.post("/api/submit/approve/:submitId", [(0, cors_1.default)({ origin: config_1.default.get("origin") }), deserializeAdmin_middleware_1.default, getAdmin_middleware_1.default], (0, validateResource_middleware_1.default)(submit_schema_1.submitProverbIdSchema), submit_controller_1.approveSubmittedProverbHandler);
router.delete("/api/submit/disappprove/:submitId", [(0, cors_1.default)({ origin: config_1.default.get("origin") }), deserializeAdmin_middleware_1.default, getAdmin_middleware_1.default], (0, validateResource_middleware_1.default)(submit_schema_1.submitProverbIdSchema), submit_controller_1.disapprovedSubmittedProverbHandler);
exports.default = router;
