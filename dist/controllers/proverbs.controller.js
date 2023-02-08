"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editProverbHandler = exports.deleteProverbHandler = exports.createProverbsHandler = exports.createNewProverbHandler = exports.todayProverbHandler = exports.filterProverbHandler = exports.getProverbHandler = void 0;
const proverbs_service_1 = require("../services/proverbs.service");
const lodash_1 = __importDefault(require("lodash"));
const proverb_model_1 = require("../models/proverb.model");
/**
 * Get a random proverb.
 * @returns A proverb object
 */
async function getProverbHandler(_, res) {
    try {
        const proverb = await (0, proverbs_service_1.getProverbService)({});
        res.send(lodash_1.default.omit(proverb[0], proverb_model_1.privateFields));
    }
    catch (err) {
        return res.status(500).send(err);
    }
}
exports.getProverbHandler = getProverbHandler;
/**
 * Get a random proverb whos country field matches request params.
 * @returns A proverb object.
 */
async function filterProverbHandler(req, res) {
    try {
        const proverb = await (0, proverbs_service_1.getProverbService)({ filter: req.query.filter });
        res.send(lodash_1.default.omit(proverb[0], proverb_model_1.privateFields));
    }
    catch (err) {
        res.send(err);
    }
}
exports.filterProverbHandler = filterProverbHandler;
/**
 * Get a single proverb object from cached memory.
 * @param req
 * @param res
 * @returns A proverb object.
 */
async function todayProverbHandler(req, res) {
    res.send("proverb today");
}
exports.todayProverbHandler = todayProverbHandler;
// Admins only
async function createNewProverbHandler(req, res) {
    try {
        if (!res.locals.admin) {
            return res.send("Some section you would never see. HAHAHAHAH");
        }
        const proverb = await (0, proverbs_service_1.createNewProverbService)(req.body, res.locals.admin._id);
        res.json(lodash_1.default.omit(proverb.toJSON(), proverb_model_1.privateFields));
    }
    catch (err) {
        res.send(err);
    }
}
exports.createNewProverbHandler = createNewProverbHandler;
async function createProverbsHandler(req, res) {
    res.send("post new probs");
}
exports.createProverbsHandler = createProverbsHandler;
async function deleteProverbHandler(req, res) {
    try {
        const proverb = await (0, proverbs_service_1.deleteProverbService)({
            authorId: res.locals.admin._id,
            proverbId: req.query.proverbId,
        });
        if (!proverb) {
            return res.send(`Proverb with ID:${req.query.proverbId} isnt' found`);
        }
        res.send(`Proverb with id: #${req.query.proverbId} was deleted.`);
    }
    catch (err) {
        return res.send(`Couldn't delete proverb with id: #${req.query.proverbId}`);
    }
}
exports.deleteProverbHandler = deleteProverbHandler;
async function editProverbHandler(req, res) {
    try {
        const proverb = await (0, proverbs_service_1.editProverbService)({
            proverbId: req.query.proverbId,
            payload: req.body,
        });
        res.send(`Proverb #ID: ${proverb?.id} was updated`);
    }
    catch (err) {
        res.send("Couldn't update proverb");
    }
}
exports.editProverbHandler = editProverbHandler;
