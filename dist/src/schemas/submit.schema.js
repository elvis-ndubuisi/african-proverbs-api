"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitProverbIdSchema = exports.submitProverbSchema = void 0;
const zod_1 = require("zod");
exports.submitProverbSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({ required_error: "Name is required" }),
        twitterHandle: (0, zod_1.string)().min(3, "Invalid handle").optional(),
        postOnTwitter: (0, zod_1.boolean)().optional(),
        proverb: (0, zod_1.string)({ required_error: "You have to submit a proverb" }),
        country: (0, zod_1.string)({ required_error: "Country is required" }),
        native: (0, zod_1.string)({ required_error: "Native is requierd" }),
        interpretation: (0, zod_1.string)({
            required_error: "An interpretation is required",
        }).optional(),
        translations: (0, zod_1.array)((0, zod_1.object)({
            dialect: (0, zod_1.string)({
                required_error: "Dialect field or value isn't provided",
            }),
            proverb: (0, zod_1.string)({
                required_error: "Proverb field or value isn't provided",
            }),
        }))
            .max(4, "Maximum translation value exceeded")
            .optional(),
    }),
});
exports.submitProverbIdSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        submitId: (0, zod_1.string)({ required_error: "No submitId provided" }),
    }),
});
