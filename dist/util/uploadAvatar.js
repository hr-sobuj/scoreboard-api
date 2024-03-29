"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const multer_1 = __importStar(require("multer"));
const path_1 = __importDefault(require("path"));
function uploader(subDirectory, allowedFileType, maxFileSize, errorMsg) {
    const UPLOAD_DIR = `${__dirname}/../public/uploads/${subDirectory}/`;
    const storage = (0, multer_1.diskStorage)({
        destination(req, file, cb) {
            cb(null, UPLOAD_DIR);
        },
        filename(req, file, cb) {
            const fileExtension = path_1.default.extname(file.originalname);
            const fileName = file.originalname.replace(fileExtension, ' ').split(' ').join('-') + Date.now();
            cb(null, fileName + fileExtension);
        },
    });
    const upload = (0, multer_1.default)({
        storage,
        limits: {
            fileSize: maxFileSize,
        },
        fileFilter(req, file, cb) {
            if (allowedFileType.includes(file.mimetype)) {
                cb(null, true);
            }
            else {
                cb((0, http_errors_1.default)(errorMsg));
            }
        },
    });
    return upload;
}
exports.default = uploader;
