import { Router } from "express";
import { authLoginController } from "../controller/auth/loginController";
import { authRegistrationController } from "../controller/auth/registrationController";
import {
  authRegistrationErrorHandler,
  authRegistrationValidator,
} from "../middlewares/auth/registrationValidator";

const route = Router();

route.post(
  "/registration",
  authRegistrationValidator,
  authRegistrationErrorHandler,
  authRegistrationController
);

route.post("/login", authLoginController);

// route.get("/refresh-token", authGuard, refreshToken);

export default route;
