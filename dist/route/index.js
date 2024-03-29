"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = __importDefault(require("./../app/modules/auth/auth.route"));
const score_route_1 = __importDefault(require("./../app/modules/score/score.route"));
const routers = (0, express_1.Router)();
const rootRouter = [
    {
        path: '/auth',
        route: auth_route_1.default
    },
    {
        path: '/score',
        route: score_route_1.default
    },
];
rootRouter.forEach(route => routers.use(route.path, route.route));
exports.default = routers;
