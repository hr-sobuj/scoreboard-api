import { Router } from "express";
import { authRegistrationErrorHandler, authRegistrationValidator } from "../../middlewares/auth/registrationValidator";
import uploadAvatar from "../../middlewares/auth/uploadAvatar";
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

route.post("/upload/avatar/:id", authGuard, uploadAvatar, avatarUpload)

export default route;
