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
exports.scoreErrorHandler = exports.scoreValidator = void 0;
const express_validator_1 = require("express-validator");
const http_errors_1 = __importDefault(require("http-errors"));
const validateRole = ['bat', 'ball'];
exports.scoreValidator = [
    (0, express_validator_1.check)('name')
        .notEmpty()
        .withMessage('Name field is required'),
    (0, express_validator_1.check)('b4')
        .isNumeric()
        .withMessage('B4 field data invalid'),
    (0, express_validator_1.check)('b6')
        .isNumeric()
        .withMessage('B6 field data invalid'),
    (0, express_validator_1.check)('totalRun')
        .isNumeric()
        .withMessage('totalRun field data invalid'),
    (0, express_validator_1.check)('totalBall')
        .isNumeric()
        .withMessage('totalBall field data invalid'),
    (0, express_validator_1.check)('role')
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        if (!validateRole.includes(value)) {
            throw (0, http_errors_1.default)(500, 'Role must be bat or ball!');
        }
    }))
];
const scoreErrorHandler = (req, res, next) => {
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
exports.scoreErrorHandler = scoreErrorHandler;
