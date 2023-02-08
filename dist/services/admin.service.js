"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProverbService = exports.findAdminByEmailService = exports.findAdminByIdService = exports.createAdminService = void 0;
const admin_model_1 = __importDefault(require("../models/admin.model"));
const proverb_model_1 = __importDefault(require("../models/proverb.model"));
function createAdminService(payload) {
    return admin_model_1.default.create(payload);
}
exports.createAdminService = createAdminService;
function findAdminByIdService(id) {
    return admin_model_1.default.findById(id);
}
exports.findAdminByIdService = findAdminByIdService;
function findAdminByEmailService(email) {
    return admin_model_1.default.findOne({ email: email });
}
exports.findAdminByEmailService = findAdminByEmailService;
function createProverbService(payload) {
    return proverb_model_1.default.create(payload);
}
exports.createProverbService = createProverbService;
