"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.approveProverbSchema = exports.resetPasswordAdminSchema = exports.forgotPasswordAdminSchema = exports.verifyAdminSchema = exports.registerAdminSchema = void 0;
const zod_1 = require("zod");
exports.registerAdminSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        username: (0, zod_1.string)({
            required_error: "Username is required",
        }),
        email: (0, zod_1.string)({
            required_error: "Email is required",
        }).email("Not a valid email"),
        password: (0, zod_1.string)({ required_error: "Password is required" }).min(6, "Mininum of 6 characters is required"),
        confirmPassword: (0, zod_1.string)({ required_error: "Confirm Password is required" }),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    }),
});
exports.verifyAdminSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        id: (0, zod_1.string)(),
        verificationCode: (0, zod_1.string)(),
    }),
});
exports.forgotPasswordAdminSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        email: (0, zod_1.string)({ required_error: "Email is required" }).email("Not a valid email"),
    }),
});
exports.resetPasswordAdminSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({ id: (0, zod_1.string)(), passwordResetCode: (0, zod_1.string)() }),
    body: (0, zod_1.object)({
        password: (0, zod_1.string)({ required_error: "Password is required" }).min(6, "Mininum of 6 characters is required"),
        confirmPassword: (0, zod_1.string)({ required_error: "Confirm Password is required" }),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    }),
});
exports.approveProverbSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        submitProverbid: (0, zod_1.string)(),
    }),
});
