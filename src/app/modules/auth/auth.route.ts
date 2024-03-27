import { Router } from "express";
import { authRegistrationErrorHandler, authRegistrationValidator } from "../../middlewares/auth/registrationValidator";
import { authLoginController, authRegistrationController, refreshTokenController } from "./auth.controller";

const route = Router();

route.post(
    "/registration",
    authRegistrationValidator,
    authRegistrationErrorHandler,
    authRegistrationController
);

route.post("/login", authLoginController);

route.get("/refresh-token", refreshTokenController);

export default route;
