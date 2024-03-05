import { AuthLoginController } from '../controller/auth/loginController';
import { refreshToken } from '../controller/auth/refreshToken';
import { AuthRegistrationController } from '../controller/auth/registrationController';
import { AuthRegistrationErrorHandler, AuthRegistrationValidator } from '../middlewares/auth/registrationValidator';
import { authGuard } from '../middlewares/common/authGuard';
/*
|--------------------------------------------------------------------------
| Import Dependencies
|--------------------------------------------------------------------------
*/
const express = require('express');

/*
|--------------------------------------------------------------------------
| Sub Route
|--------------------------------------------------------------------------
*/
const route = express.Router();

/*
|--------------------------------------------------------------------------
| User Registraion Route
|--------------------------------------------------------------------------
*/
route.post('/registration', AuthRegistrationValidator, AuthRegistrationErrorHandler, AuthRegistrationController);

/*
|--------------------------------------------------------------------------
| User Login Route
|--------------------------------------------------------------------------
*/
route.post('/login', AuthLoginController);

/*
|--------------------------------------------------------------------------
| Refresh token Route
|--------------------------------------------------------------------------
*/
route.get('/refresh-token', authGuard, refreshToken);


module.exports = route;