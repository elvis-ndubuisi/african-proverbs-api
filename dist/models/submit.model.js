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
exports.Submit = void 0;
const typegoose_1 = require("@typegoose/typegoose");
let Submit = class Submit {
};
__decorate([
    (0, typegoose_1.prop)({ required: true, lowercase: true, trim: true }),
    __metadata("design:type", String)
], Submit.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Submit.prototype, "twitterHandle", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: false }),
    __metadata("design:type", Boolean)
], Submit.prototype, "postOnTwitter", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, trim: true, unique: true, lowercase: true }),
    __metadata("design:type", String)
], Submit.prototype, "proverb", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, lowercase: true }),
    __metadata("design:type", String)
], Submit.prototype, "country", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, lowercase: true }),
    __metadata("design:type", String)
], Submit.prototype, "native", void 0);
__decorate([
    (0, typegoose_1.prop)({ lowercase: true }),
    __metadata("design:type", String)
], Submit.prototype, "interpretation", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => [Object] }),
    __metadata("design:type", Array)
], Submit.prototype, "translations", void 0);
Submit = __decorate([
    (0, typegoose_1.modelOptions)({
        schemaOptions: { timestamps: true },
        options: { allowMixed: typegoose_1.Severity.ALLOW },
    }),
    (0, typegoose_1.post)("save", function () {
        // post on twitter
        // console.log(this);
    })
], Submit);
exports.Submit = Submit;
const SubmitModel = (0, typegoose_1.getModelForClass)(Submit);
exports.default = SubmitModel;
