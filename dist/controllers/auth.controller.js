"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshAccessTokenHandler = exports.createSessionHandler = void 0;
const admin_service_1 = require("../services/admin.service");
const auth_service_1 = require("../services/auth.service");
const lodash_1 = __importDefault(require("lodash"));
const jwt_util_1 = require("../utils/jwt.util");
async function createSessionHandler(req, res) {
    const message = "Invalid email or password";
    const { email, password } = req.body;
    const admin = await (0, admin_service_1.findAdminByEmailService)(email);
    if (!admin)
        return res.send(message);
    if (!admin.verified)
        return res.send("Please verify your email");
    const isValid = await admin.validatePassword(password);
    if (!isValid)
        return res.send(message);
    //   Sign access token
    const accessToken = (0, auth_service_1.signAccessTokenService)(admin);
    //   Sign refresh token
    const refreshToken = await (0, auth_service_1.signRefreshTokenService)({ adminId: admin._id });
    //   Send tokens
    return res.send({ accessToken, refreshToken });
}
exports.createSessionHandler = createSessionHandler;
async function refreshAccessTokenHandler(req, res) {
    const refreshToken = lodash_1.default.get(req, "headers.x-refresh");
    const decoded = (0, jwt_util_1.verifyJwt)(refreshToken, "refreshTokenPublicKey");
    if (!decoded) {
        return res.status(401).send("Could not refresh access token");
    }
    const session = await (0, auth_service_1.findSessionByIdService)(decoded.session);
    if (!session || !session.valid) {
        return res.status(401).send("Could not refresh access token");
    }
    const admin = await (0, admin_service_1.findAdminByIdService)(String(session.admin));
    if (!admin) {
        return res.status(401).send("Couldn't refresh access token");
    }
    const accessToken = (0, auth_service_1.signAccessTokenService)(admin);
    return res.send({ accessToken });
}
exports.refreshAccessTokenHandler = refreshAccessTokenHandler;
