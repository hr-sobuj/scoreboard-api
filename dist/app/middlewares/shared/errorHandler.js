"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFoundHandler = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
function notFoundHandler(req, res, next) {
    next((0, http_errors_1.default)(404, 'Route not found!'));
}
exports.notFoundHandler = notFoundHandler;
function errorHandler(err, req, res, next) {
    let error = process.env.NODE_ENV === 'development' ? err : { message: err.message };
    res.status(err.status || 500);
    res.json(error);
}
exports.errorHandler = errorHandler;
