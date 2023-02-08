"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyToProverbService = exports.editProverbService = exports.deleteProverbService = exports.createNewProverbService = exports.todayProverbService = exports.getProverbService = void 0;
const proverb_model_1 = __importStar(require("../models/proverb.model"));
const lodash_1 = __importDefault(require("lodash"));
/**
 * Fetches a single randomly selected proverb field.
 * If filter param is passed, only proverb object which statisfies filter param is returned.
 * @param {filter: filterString} Query string to use as filter.
 * @returns A proverb object.
 */
function getProverbService({ filter }) {
    return proverb_model_1.default.aggregate([
        { $match: { $or: [{ country: filter }, { native: filter }] } },
        { $sample: { size: 1 } },
    ]);
}
exports.getProverbService = getProverbService;
/**
 * Fetches a proverb object from cached memory
 * @returns Proverb object from cached memory
 */
async function todayProverbService() {
    return "proverb from redis memory";
}
exports.todayProverbService = todayProverbService;
async function createNewProverbService(body, authorId) {
    return proverb_model_1.default.create({ ...body, author: authorId });
}
exports.createNewProverbService = createNewProverbService;
async function deleteProverbService({ proverbId, authorId, }) {
    try {
        return await proverb_model_1.default.findByIdAndDelete({
            _id: proverbId,
            author: authorId,
        });
    }
    catch (err) {
        return err;
    }
}
exports.deleteProverbService = deleteProverbService;
async function editProverbService({ proverbId, payload, }) {
    return proverb_model_1.default.findByIdAndUpdate(proverbId, payload);
}
exports.editProverbService = editProverbService;
function copyToProverbService({ payload, authorId, }) {
    const p = lodash_1.default.omit(payload, proverb_model_1.privateFields);
    return proverb_model_1.default.create({ ...p, author: authorId });
}
exports.copyToProverbService = copyToProverbService;
