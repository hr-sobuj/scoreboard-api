"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const avatarGuard_1 = __importDefault(require("../../middlewares/auth/avatarGuard"));
const registrationValidator_1 = require("../../middlewares/auth/registrationValidator");
const authGuard_1 = require("../../middlewares/shared/authGuard");
const auth_controller_1 = require("./auth.controller");
const route = (0, express_1.Router)();
const routerMap = [
    {
        method: 'post',
        path: '/registration',
        controller: [
            registrationValidator_1.authRegistrationValidator,
            registrationValidator_1.authRegistrationErrorHandler,
            auth_controller_1.authRegistrationController
        ]
    },
    {
        method: 'post',
        path: '/login',
        controller: [
            auth_controller_1.authLoginController
        ]
    },
    {
        method: 'get',
        path: '/refresh-token',
        controller: [
            auth_controller_1.refreshTokenController
        ]
    },
    {
        method: 'post',
        path: '/upload/avatar/:id',
        controller: [
            authGuard_1.authGuard, avatarGuard_1.default, auth_controller_1.avatarUpload
        ]
    },
];
routerMap.forEach(router => route[router.method](router.path, [...router.controller]));
exports.default = route;
