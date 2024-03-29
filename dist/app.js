"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const path_1 = __importDefault(require("path"));
const errorHandler_1 = require("./app/middlewares/shared/errorHandler");
const db_1 = require("./db/db");
const index_1 = __importDefault(require("./route/index"));
const app = (0, express_1.default)();
// cors options
const corsOptions = {
    origin: ["https://scoreboard-frontend-tsx.vercel.app/", true],
    credentials: true,
    methods: ["GET", "PUT", "POST", "DELETE"],
    maxAge: 3600000,
};
app.use((0, cors_1.default)(corsOptions));
app.use((0, cors_1.default)(corsOptions));
// database connection
(0, db_1.dbConnection)(app);
// static files
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
// rate limit 
const limiter = (0, express_rate_limit_1.default)({
    limit: 5000,
    windowMs: 15 * 60 * 1000,
    message: 'Too many request from your IP address. Thats why we blocked it',
});
app.use(limiter);
// middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
// route
app.use("/api/v1/", index_1.default);
// response
// app.use((req, res, next) => {
//   responseFormatter(req, res, next);
// });
// extra middleware
app.use(errorHandler_1.notFoundHandler);
app.use(errorHandler_1.errorHandler);
exports.default = app;
