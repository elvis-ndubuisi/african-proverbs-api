"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentAdminHandler = exports.resetPasswordAdminHandler = exports.forgotPasswordAdminHandler = exports.verifyAdminHandler = exports.registerAdminHandler = void 0;
const config_1 = __importDefault(require("config"));
const admin_service_1 = require("../services/admin.service");
const logger_util_1 = __importDefault(require("../utils/logger.util"));
const lodash_1 = __importDefault(require("lodash"));
// Test
const mailer_util_1 = __importDefault(require("../utils/mailer.util"));
const nanoid_1 = require("nanoid");
/**
 * Register Admin. Admin roles are assigned by default if non is provided.
 * @param req.body.username Username of registering admin.
 * @param req.body.email  Email of registering admin.
 * @param req.body.password Password chosen by registering admin.
 * @param req.body.confirmPassword Secondary password to validate password.
 * @returns HTTP response - text.
 */
async function registerAdminHandler(req, res) {
    const body = req.body;
    try {
        const admin = await (0, admin_service_1.createAdminService)(body);
        await (0, mailer_util_1.default)({
            to: admin.email,
            subject: "Account Verification",
            text: "Verify Account",
            url: `${config_1.default.get("host")}/api/admin/verify/${admin._id}/${admin.verificationCode}`,
        });
        res.send("Admin was created");
    }
    catch (err) {
        if (err.code === 11000) {
            return res.status(409).send("account already exists");
        }
        console.log(err);
        return res.status(500).send(err);
    }
}
exports.registerAdminHandler = registerAdminHandler;
/**
 * Verify newly registerd admin. Verification is performed via endpoint sent to admins mail
 * @param req.params.id Admin ID
 * @param req.params.verificationCode Verification code sent with the email.
 * @returns HTTPS response - text.
 */
async function verifyAdminHandler(req, res) {
    const id = req.params.id;
    const verificationCode = req.params.verificationCode;
    //   find admin by id
    const admin = await (0, admin_service_1.findAdminByIdService)(id);
    //   check to see if admin is registered
    if (!admin)
        return res.send("Couldn't verify user");
    //   check to see if admin is already verified
    if (admin.verified)
        return res.send("admin is already verified");
    // check to see if the verification code matched
    if (admin.verificationCode === verificationCode) {
        admin.verified = true;
        await admin.save();
        return res.send(`admin successfully verified. <a href="${config_1.default.get("origin")}/auth/login">Proceed to login page</a>`);
    }
    return res.send("Couldn't verify admin");
}
exports.verifyAdminHandler = verifyAdminHandler;
/**
 * Validates if an admin can reset their passwords if lost.
 * Emails are sent to admin's mail IF admin info is found in the database
 * @param req.body.email Email from admin
 * @returns HTTP response - text
 */
async function forgotPasswordAdminHandler(req, res) {
    const email = req.body.email;
    const admin = await (0, admin_service_1.findAdminByEmailService)(email);
    if (!admin) {
        logger_util_1.default.debug(`Admin with email: ${email} doesn't exists`);
        return res.send("A message has been sent to your mail");
    }
    if (!admin?.verified) {
        return res.send("User is not verified");
    }
    const passwordResetCode = (0, nanoid_1.nanoid)();
    admin.passwordResetCode = passwordResetCode;
    await admin.save();
    //   Send email to Admin
    await (0, mailer_util_1.default)({
        to: admin.email,
        subject: "Reset Password",
        text: "Reset your password",
        url: `${config_1.default.get("host")}/api/admin/resetpassword/${admin._id}/${passwordResetCode}`,
    });
    return res.send("A message has been sent to your mail");
}
exports.forgotPasswordAdminHandler = forgotPasswordAdminHandler;
/**
 * Resets admin password with new password
 * @param req - id, passwordResetCode = req.params & password, confirmPassword from req.body
 * @returns HTTP response - text.
 */
async function resetPasswordAdminHandler(req, res) {
    const { id, passwordResetCode } = req.params;
    const { password } = req.body;
    const admin = await (0, admin_service_1.findAdminByIdService)(id);
    if (!admin ||
        !admin.passwordResetCode ||
        admin.passwordResetCode !== passwordResetCode) {
        return res.status(400).send("couldn't reset your password");
    }
    admin.passwordResetCode = null;
    admin.password = password;
    await admin.save();
    return res.send(`Password updated successfully. Proceed to <a href="${config_1.default.get("origin")}/auth/login">Login Page</a>`);
}
exports.resetPasswordAdminHandler = resetPasswordAdminHandler;
/**
 * Gets details of currently logged in admin.
 * @returns
 */
async function getCurrentAdminHandler(req, res) {
    return res.send(lodash_1.default.omit(res.locals.admin, ["passwordResetCode"]));
}
exports.getCurrentAdminHandler = getCurrentAdminHandler;
