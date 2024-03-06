import { Router } from "express";
import { authLoginController } from "../controller/auth/loginController";
import { authRegistrationController } from "../controller/auth/registrationController";
import {
  authRegistrationErrorHandler,
  authRegistrationValidator,
} from "../middlewares/auth/registrationValidator";
import { refreshTokenController } from "../controller/auth/refreshTokenController";

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
