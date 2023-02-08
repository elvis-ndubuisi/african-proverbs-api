"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disapprovedSubmittedProverbHandler = exports.approveSubmittedProverbHandler = exports.getSubmittedProverbsHandler = exports.submitProverbHandler = void 0;
const submit_service_1 = require("../services/submit.service");
const logger_util_1 = __importDefault(require("../utils/logger.util"));
async function submitProverbHandler(req, res) {
    try {
        const submitted = await (0, submit_service_1.submitProverbService)(req.body);
        if (submitted.postOnTwitter && submitted.twitterHandle !== "") {
            return res
                .status(200)
                .json({ name: submitted.name, handle: submitted.twitterHandle });
        }
        res.sendStatus(200);
    }
    catch (err) {
        res.send(err);
    }
}
exports.submitProverbHandler = submitProverbHandler;
async function getSubmittedProverbsHandler(req, res) {
    try {
        const proverbs = await (0, submit_service_1.getSubmittedProverbsService)();
        res.send(proverbs);
    }
    catch (err) {
        res.status(500).send("Internal server error");
    }
}
exports.getSubmittedProverbsHandler = getSubmittedProverbsHandler;
async function approveSubmittedProverbHandler(req, res) {
    try {
        const submitted = await (0, submit_service_1.approveSubmittedProverbService)({
            submitId: req.params.submitId,
            authorId: res.locals.admin._id,
        });
        if (!submitted)
            return res.send("something went wrong");
        res.send("Proverb approved");
    }
    catch (err) {
        res.send("Proverb not approved");
    }
}
exports.approveSubmittedProverbHandler = approveSubmittedProverbHandler;
async function disapprovedSubmittedProverbHandler(req, res) {
    try {
        // Check admin role.
        if (res.locals.admin.role !== "master") {
            return res.sendStatus(401);
        }
        await (0, submit_service_1.disapprovedSubmittedProverbService)(req.params.submitId);
        res.send("Proverb removed");
    }
    catch (err) {
        logger_util_1.default.error(err);
        res.send("Couldn't delete specified proverb");
    }
}
exports.disapprovedSubmittedProverbHandler = disapprovedSubmittedProverbHandler;
