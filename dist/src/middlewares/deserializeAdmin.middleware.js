"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_util_1 = require("../utils/jwt.util");
/**
 * Get access token from authorization header, decode access token/verify and attach admin to res.locals
 */
const deserializeAdmin = async (req, res, next) => {
    const accessToken = (req.headers.authorization || "").replace(/^Bearer\s/, "");
    if (!accessToken)
        return next();
    const decoded = (0, jwt_util_1.verifyJwt)(accessToken, "accessTokenPublicKey");
    if (decoded) {
        res.locals.admin = decoded;
    }
    return next();
};
exports.default = deserializeAdmin;
