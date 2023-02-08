"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.proverbFilterQuerySchema = exports.proverbIdQuerySchema = exports.createProverbsSchema = exports.createNewProverbSchema = void 0;
const zod_1 = require("zod");
const proverbFields = (0, zod_1.object)({
    proverb: (0, zod_1.string)({ required_error: "Proverb is required" }),
    country: (0, zod_1.string)({ required_error: "Proverb country is required" }),
    native: (0, zod_1.string)({ required_error: "Native field is requied" }),
    interpretation: (0, zod_1.string)({
        required_error: "Proverb interpretation is required",
    }).optional(),
    translations: (0, zod_1.array)((0, zod_1.object)({
        dialect: (0, zod_1.string)({ required_error: "Dielect is required" }),
        proverb: (0, zod_1.string)({ required_error: "Proverb is required" }),
    })).optional(),
});
exports.createNewProverbSchema = (0, zod_1.object)({
    body: proverbFields,
});
exports.createProverbsSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        proverbs: (0, zod_1.array)(proverbFields),
    }),
});
/**
 * Proverb's params - proverbId
 */
exports.proverbIdQuerySchema = (0, zod_1.object)({
    query: (0, zod_1.object)({
        proverbId: (0, zod_1.string)({ required_error: "Proverb ID is required" }),
    }),
});
exports.proverbFilterQuerySchema = (0, zod_1.object)({
    query: (0, zod_1.object)({
        filter: (0, zod_1.string)({
            required_error: "No filter params was passed. Please provide one",
        }),
    }),
});
