import { authLoginController } from '../controller/auth/loginController';
import { refreshToken } from '../controller/auth/refreshToken';
import { authRegistrationController } from '../controller/auth/registrationController';
import { authRegistrationErrorHandler, authRegistrationValidator } from '../middlewares/auth/registrationValidator';
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
route.post('/registration', authRegistrationValidator, authRegistrationErrorHandler, authRegistrationController);

/*
|--------------------------------------------------------------------------
| User Login Route
|--------------------------------------------------------------------------
*/
route.post('/login', authLoginController);

/*
|--------------------------------------------------------------------------
| Refresh token Route
|--------------------------------------------------------------------------
*/
route.get('/refresh-token', authGuard, refreshToken);


export default route;