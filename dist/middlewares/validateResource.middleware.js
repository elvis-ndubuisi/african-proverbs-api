"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_util_1 = __importDefault(require("../utils/logger.util"));
/**
 *  Validate incoming requests again a schema.
 * @param schema Object used for validation
 * @returns An error is validation fails or process to next middleware.
 */
const validateResources = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next();
    }
    catch (err) {
        logger_util_1.default.error(err.messages);
        return res.status(400).send(err.errors);
    }
};
exports.default = validateResources;
