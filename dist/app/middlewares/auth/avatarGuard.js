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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const uploadAvatar_1 = __importDefault(require("../../../util/uploadAvatar"));
const auth_model_1 = require("../../modules/auth/auth.model");
function avatarGuard(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const user = yield auth_model_1.AuthModel.find({ _id: req.params.id });
        const userAvatarDir = `${__dirname}/../../../public/uploads/avatars/${(_a = user[0]) === null || _a === void 0 ? void 0 : _a.avatar}`;
        if (fs_1.default.existsSync(userAvatarDir)) {
            fs_1.default.unlinkSync(userAvatarDir);
        }
        const upload = (0, uploadAvatar_1.default)('avatars', ['image/jpg', 'image/png', 'image/jpeg'], 100000000000, 'Only .jpg .png or .jpeg format allowed.');
        upload.any()(req, res, (err) => {
            if (err) {
                res.status(500).json({
                    errors: {
                        common: {
                            msg: err.message,
                        },
                    },
                });
            }
            else {
                next();
            }
        });
    });
}
exports.default = avatarGuard;
