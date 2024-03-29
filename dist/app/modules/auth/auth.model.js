"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModel = exports.authSchema = void 0;
const mongoose_1 = require("mongoose");
exports.authSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9]+$/,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin", "general"],
    },
    avatar: {
        type: String,
        required: false,
    }
}, {
    timestamps: true,
});
exports.authSchema.statics = {
    findOneUser: function (name) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.findOne({ username: name });
        });
    },
};
exports.AuthModel = (0, mongoose_1.model)("auth", exports.authSchema);
