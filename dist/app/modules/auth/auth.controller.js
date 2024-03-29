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
exports.avatarUpload = exports.authRegistrationController = exports.refreshTokenController = exports.authLoginController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createAsync_1 = __importDefault(require("../../../shared/createAsync"));
const envConfig_1 = require("./../../../config/envConfig");
const auth_model_1 = require("./auth.model");
/*
|--------------------------------------------------------------------------
| Login controller
|--------------------------------------------------------------------------
*/
exports.authLoginController = (0, createAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_model_1.AuthModel.findOneUser(req.body.username);
    if (user) {
        const isPasswordValid = yield bcrypt_1.default.compare(req.body.password, user.password);
        const { username } = user;
        if (isPasswordValid) {
            const token = jsonwebtoken_1.default.sign({ username }, envConfig_1.JWT_SECRET, {
                expiresIn: "1h",
            });
            const rfreshtoken = jsonwebtoken_1.default.sign({ username }, envConfig_1.JWT_SECRET_REFRESH);
            res.cookie('authInfo', { username, token }, {
                maxAge: 3600 * 3600000,
                httpOnly: true,
                secure: true,
                sameSite: "none"
            });
            res.cookie('refreshToken', { username, rfreshtoken }, {
                maxAge: 3600 * 3600000,
                httpOnly: true,
                secure: true,
                sameSite: "none"
            });
            res.status(200).json({
                token,
                msg: "Login Successfull!",
                avatar: user.avatar,
                role: user.role,
                id: user === null || user === void 0 ? void 0 : user._id,
                user
            });
        }
        else {
            res.status(500).json({
                msg: "Authentication failed!",
            });
        }
    }
    else {
        res.status(500).json({
            msg: "Authentication failed!",
        });
    }
}));
/*
|--------------------------------------------------------------------------
| Refresh Token controller
|--------------------------------------------------------------------------
*/
exports.refreshTokenController = (0, createAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies.refreshToken.rfreshtoken;
    const isValid = jsonwebtoken_1.default.verify(refreshToken, envConfig_1.JWT_SECRET);
    const { username } = isValid;
    if (isValid) {
        const token = jsonwebtoken_1.default.sign({ username }, envConfig_1.JWT_SECRET, {
            expiresIn: '.01h'
        });
        const rfreshtoken = jsonwebtoken_1.default.sign({ username }, envConfig_1.JWT_SECRET_REFRESH);
        res.cookie('authInfo', { username, token }, {
            maxAge: 3600000,
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });
        res.cookie('refreshToken', { username, rfreshtoken }, {
            maxAge: 3600000,
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });
        res.status(200).json({
            token
        });
    }
    else {
        res.status(500).json({
            msg: "Operation failed!"
        });
    }
}));
/*
|--------------------------------------------------------------------------
| Registration controller
|--------------------------------------------------------------------------
*/
exports.authRegistrationController = (0, createAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const hashPassword = yield bcrypt_1.default.hash(req.body.password, 10);
    const requestBody = Object.assign(Object.assign({}, req.body), { password: hashPassword, avatar: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png' });
    const newUser = new auth_model_1.AuthModel(requestBody);
    yield newUser.save();
    if (newUser) {
        res.json({
            message: "User Registration Successful!",
        });
    }
}));
exports.avatarUpload = (0, createAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let avatar = null;
    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
        avatar = req.files[0].filename;
    }
    const result = yield auth_model_1.AuthModel.findByIdAndUpdate({ _id: id }, { $set: { avatar: avatar } }, { new: true, useFindAndModify: false });
    res.status(200).json({
        message: "Profile picture updated successfully!",
        result
    });
}));
