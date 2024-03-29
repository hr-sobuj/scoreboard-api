"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const scoreValidator_1 = require("../../middlewares/score/scoreValidator");
const authGuard_1 = require("../../middlewares/shared/authGuard");
const score_controller_1 = require("./score.controller");
const route = (0, express_1.Router)();
const routerMap = [
    {
        method: 'get',
        path: '/:id',
        controller: [score_controller_1.getScore]
    },
    {
        method: 'get',
        path: '/get/all',
        controller: [score_controller_1.getAllScore]
    },
    {
        method: 'post',
        path: '/create',
        controller: [authGuard_1.authGuard, scoreValidator_1.scoreValidator, scoreValidator_1.scoreErrorHandler, score_controller_1.createScore]
    },
    {
        method: 'put',
        path: '/update/:id',
        controller: [authGuard_1.authGuard, score_controller_1.updateScore]
    },
    {
        method: 'delete',
        path: '/delete/:id',
        controller: [authGuard_1.authGuard, score_controller_1.deleteScore]
    }
];
routerMap.forEach(router => route[router.method](router.path, ...router.controller));
exports.default = route;
