"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authGuard = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const envConfig_1 = require("./../../../config/envConfig");
/*
|--------------------------------------------------------------------------
| Auth guard prevent unauthenticated user request
|--------------------------------------------------------------------------
*/
function authGuard(req, res, next) {
    var _a, _b;
    const token = (_a = req.cookies.authInfo) === null || _a === void 0 ? void 0 : _a.token;
    try {
        const isToken = jsonwebtoken_1.default.verify(token, envConfig_1.JWT_SECRET);
        if (isToken) {
            req.username = isToken.username;
            next();
        }
    }
    catch (error) {
        const refreshToken = (_b = req.cookies.refreshToken) === null || _b === void 0 ? void 0 : _b.rfreshtoken;
        const isValid = jsonwebtoken_1.default.verify(refreshToken, envConfig_1.JWT_SECRET_REFRESH);
        const { username } = isValid;
        if (isValid) {
            const token = jsonwebtoken_1.default.sign({ username }, envConfig_1.JWT_SECRET, {
                expiresIn: '1h'
            });
            res.cookie('authInfo', { username, token }, {
                maxAge: 3600 * 3600000,
                httpOnly: true,
                secure: true,
                sameSite: "none"
            });
            next();
        }
    }
}
exports.authGuard = authGuard;
