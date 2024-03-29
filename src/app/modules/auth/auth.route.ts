import { Router } from "express";
import type { RouteItem } from "../../../types/RouteItem";
import avatarGuard from "../../middlewares/auth/avatarGuard";
import { authRegistrationErrorHandler, authRegistrationValidator } from "../../middlewares/auth/registrationValidator";
import { authGuard } from "../../middlewares/shared/authGuard";
import { authLoginController, authRegistrationController, avatarUpload, refreshTokenController } from "./auth.controller";


const route = Router();

const routerMap: RouteItem[] = [
    {
        method: 'post',
        path: '/registration',
        controller: [
            authRegistrationValidator,
            authRegistrationErrorHandler,
            authRegistrationController
        ]
    },
    {
        method: 'post',
        path: '/login',
        controller: [
            authLoginController
        ]
    },
    {
        method: 'get',
        path: '/refresh-token',
        controller: [
            refreshTokenController
        ]
    },
    {
        method: 'post',
        path: '/upload/avatar/:id',
        controller: [
            authGuard, avatarGuard, avatarUpload
        ]
    },
];


routerMap.forEach(router => route[router.method](router.path, [...router.controller]))


export default route;
