import { Router } from "express";
import type { RouteItem } from "../../../types/RouteItem";
import { scoreErrorHandler, scoreValidator } from "../../middlewares/score/scoreValidator";
import { authGuard } from "../../middlewares/shared/authGuard";
import { createScore, deleteScore, getAllScore, getScore, updateScore } from "./score.controller";


const route = Router();

const routerMap: RouteItem[] = [
    {
        method: 'get',
        path: '/:id',
        controller: [getScore]
    },
    {
        method: 'get',
        path: '/get/all',
        controller: [getAllScore]
    },
    {
        method: 'post',
        path: '/create',
        controller: [authGuard, scoreValidator, scoreErrorHandler, createScore]
    },
    {
        method: 'put',
        path: '/update/:id',
        controller: [authGuard, updateScore]
    },
    {
        method: 'delete',
        path: '/delete/:id',
        controller: [authGuard, deleteScore]
    }
];

routerMap.forEach(router => route[router.method](router.path, ...router.controller));

export default route;
