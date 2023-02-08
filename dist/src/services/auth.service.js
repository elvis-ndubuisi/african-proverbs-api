"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signRefreshTokenService = exports.signAccessTokenService = exports.findSessionByIdService = exports.createSessionService = void 0;
const admin_model_1 = require("../models/admin.model");
const lodash_1 = __importDefault(require("lodash"));
const session_model_1 = __importDefault(require("../models/session.model"));
const jwt_util_1 = require("../utils/jwt.util");
const config_1 = __importDefault(require("config"));
async function createSessionService({ adminId }) {
    return session_model_1.default.create({ admin: adminId });
}
exports.createSessionService = createSessionService;
async function findSessionByIdService(id) {
    return session_model_1.default.findById(id);
}
exports.findSessionByIdService = findSessionByIdService;
function signAccessTokenService(admin) {
    const payload = lodash_1.default.omit(admin.toJSON(), admin_model_1.privateFields);
    const accessToken = (0, jwt_util_1.signJwt)(payload, "accessTokenPrivateKey", {
        expiresIn: config_1.default.get("shortSession"),
    });
    return accessToken;
}
exports.signAccessTokenService = signAccessTokenService;
async function signRefreshTokenService({ adminId, }) {
    const session = await createSessionService({ adminId });
    const refreshToken = (0, jwt_util_1.signJwt)({ session: session._id }, "refreshTokenPrivateKey", {
        expiresIn: config_1.default.get("longSession"),
    });
    return refreshToken;
}
exports.signRefreshTokenService = signRefreshTokenService;
