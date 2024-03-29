"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.NODE_ENV = exports.MONGO_CONNECTION_STRING_PRODUCTION = exports.MONGO_CONNECTION_STRING_DEVELOPMENT = exports.JWT_SECRET = exports.JWT_SECRET_REFRESH = exports.JWT_EXPIRES_IN = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { PORT, JWT_SECRET_REFRESH, MONGO_CONNECTION_STRING_DEVELOPMENT, MONGO_CONNECTION_STRING_PRODUCTION, JWT_SECRET, JWT_EXPIRES_IN, NODE_ENV } = process.env;
exports.PORT = PORT;
exports.JWT_SECRET_REFRESH = JWT_SECRET_REFRESH;
exports.MONGO_CONNECTION_STRING_DEVELOPMENT = MONGO_CONNECTION_STRING_DEVELOPMENT;
exports.MONGO_CONNECTION_STRING_PRODUCTION = MONGO_CONNECTION_STRING_PRODUCTION;
exports.JWT_SECRET = JWT_SECRET;
exports.JWT_EXPIRES_IN = JWT_EXPIRES_IN;
exports.NODE_ENV = NODE_ENV;
