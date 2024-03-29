import { Router } from "express";
import avatarGuard from "../../middlewares/auth/avatarGuard";
import { authRegistrationErrorHandler, authRegistrationValidator } from "../../middlewares/auth/registrationValidator";
import { authGuard } from "../../middlewares/shared/authGuard";
import { authLoginController, authRegistrationController, avatarUpload, refreshTokenController } from "./auth.controller";

const route = Router();

route.post(
    "/registration",
    authRegistrationValidator,
    authRegistrationErrorHandler,
    authRegistrationController
);

route.post("/login", authLoginController);

route.get("/refresh-token", refreshTokenController);

route.post("/upload/avatar/:id", authGuard, avatarGuard, avatarUpload)

export default route;
