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
exports.authRegistrationErrorHandler = exports.authRegistrationValidator = void 0;
const express_validator_1 = require("express-validator");
const http_errors_1 = __importDefault(require("http-errors"));
const auth_model_1 = require("./../../modules/auth/auth.model");
/*
|--------------------------------------------------------------------------
| This method validate the request body
|--------------------------------------------------------------------------
*/
exports.authRegistrationValidator = [
    (0, express_validator_1.check)('username')
        .isAlphanumeric()
        .withMessage('Please provide a correct username!')
        .trim()
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let result = yield auth_model_1.AuthModel.find({ username: value });
            if (result.length > 0) {
                throw (0, http_errors_1.default)(400, 'Username already exists!');
            }
        }
        catch (error) {
            throw (0, http_errors_1.default)(500, error.message);
        }
    })),
    (0, express_validator_1.check)('password')
        .isStrongPassword()
        .withMessage('Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol'),
];
/*
|--------------------------------------------------------------------------
| Here Handling the error which is generated from AuthValidator
|--------------------------------------------------------------------------
*/
const authRegistrationErrorHandler = (req, res, next) => {
    const error = (0, express_validator_1.validationResult)(req);
    const errorMapped = error.mapped();
    if (Object.keys(errorMapped).length === 0) {
        next();
    }
    else {
        res.status(500).json({
            msg: Object.keys(errorMapped).map(val => errorMapped[val].msg),
        });
    }
};
exports.authRegistrationErrorHandler = authRegistrationErrorHandler;
