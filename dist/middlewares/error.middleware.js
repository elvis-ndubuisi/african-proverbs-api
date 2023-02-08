"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function requestError(err, req, res, next) {
    next(err);
}
exports.default = requestError;
