"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("config"));
const admin_controller_1 = require("../controllers/admin.controller");
const validateResource_middleware_1 = __importDefault(require("../middlewares/validateResource.middleware"));
const admin_schema_1 = require("../schemas/admin.schema");
const deserializeAdmin_middleware_1 = __importDefault(require("../middlewares/deserializeAdmin.middleware"));
const getAdmin_middleware_1 = __importDefault(require("../middlewares/getAdmin.middleware"));
const router = express_1.default.Router();
// router.use(deserializeAdmin);
router.post("/api/admin/register", deserializeAdmin_middleware_1.default, (0, validateResource_middleware_1.default)(admin_schema_1.registerAdminSchema), admin_controller_1.registerAdminHandler);
router.get("/api/admin/verify/:id/:verificationCode", deserializeAdmin_middleware_1.default, (0, validateResource_middleware_1.default)(admin_schema_1.verifyAdminSchema), admin_controller_1.verifyAdminHandler);
router.post("/api/admin/forgotpassword", deserializeAdmin_middleware_1.default, (0, validateResource_middleware_1.default)(admin_schema_1.forgotPasswordAdminSchema), admin_controller_1.forgotPasswordAdminHandler);
router.post("/api/admin/resetpassword/:id/:passwordResetCode", deserializeAdmin_middleware_1.default, (0, validateResource_middleware_1.default)(admin_schema_1.resetPasswordAdminSchema), admin_controller_1.resetPasswordAdminHandler);
(0, cors_1.default)({ origin: config_1.default.get("origin") }),
    router.get("/api/admin/me", deserializeAdmin_middleware_1.default, getAdmin_middleware_1.default, admin_controller_1.getCurrentAdminHandler);
exports.default = router;
