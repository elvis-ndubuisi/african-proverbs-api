"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getAdmin = (req, res, next) => {
    const admin = res.locals.admin;
    if (!admin) {
        return res.sendStatus(403);
    }
    return next();
};
exports.default = getAdmin;
