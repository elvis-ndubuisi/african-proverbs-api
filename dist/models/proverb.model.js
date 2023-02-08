"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Proverb = exports.privateFields = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const admin_model_1 = require("./admin.model");
exports.privateFields = ["__v", "author", "_id", "createdAt", "updatedAt"];
let Proverb = class Proverb {
};
__decorate([
    (0, typegoose_1.prop)({ required: true, unique: true, lowercase: true }),
    __metadata("design:type", String)
], Proverb.prototype, "proverb", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, trim: true, lowercase: true }),
    __metadata("design:type", String)
], Proverb.prototype, "native", void 0);
__decorate([
    (0, typegoose_1.prop)({ lowercase: true, required: true }),
    __metadata("design:type", String)
], Proverb.prototype, "country", void 0);
__decorate([
    (0, typegoose_1.prop)({ lowercase: true }),
    __metadata("design:type", String)
], Proverb.prototype, "interpretation", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => [Object], default: [] }),
    __metadata("design:type", Array)
], Proverb.prototype, "translations", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => admin_model_1.Admin }),
    __metadata("design:type", Object)
], Proverb.prototype, "author", void 0);
Proverb = __decorate([
    (0, typegoose_1.post)("save", async function () {
        console.log(this.proverb);
        console.log(this.author);
    }),
    (0, typegoose_1.modelOptions)({
        schemaOptions: { timestamps: true },
        options: { allowMixed: typegoose_1.Severity.ALLOW },
    })
], Proverb);
exports.Proverb = Proverb;
const ProverbModel = (0, typegoose_1.getModelForClass)(Proverb);
exports.default = ProverbModel;
