"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disapprovedSubmittedProverbService = exports.approveSubmittedProverbService = exports.getSubmittedProverbsService = exports.submitProverbService = void 0;
const submit_model_1 = __importDefault(require("../models/submit.model"));
const logger_util_1 = __importDefault(require("../utils/logger.util"));
const proverbs_service_1 = require("./proverbs.service");
function submitProverbService(payload) {
    return submit_model_1.default.create(payload);
}
exports.submitProverbService = submitProverbService;
function getSubmittedProverbsService() {
    return "paginated submit";
}
exports.getSubmittedProverbsService = getSubmittedProverbsService;
async function approveSubmittedProverbService({ submitId, authorId, }) {
    try {
        const submitted = await submit_model_1.default.findOneAndRemove({ _id: submitId });
        const proverb = await (0, proverbs_service_1.copyToProverbService)({
            payload: submitted,
            authorId,
        });
        return proverb;
    }
    catch (err) {
        logger_util_1.default.error(err);
        return null;
    }
}
exports.approveSubmittedProverbService = approveSubmittedProverbService;
function disapprovedSubmittedProverbService(submitId) {
    return submit_model_1.default.findByIdAndDelete(submitId);
}
exports.disapprovedSubmittedProverbService = disapprovedSubmittedProverbService;
