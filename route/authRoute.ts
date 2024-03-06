import { refreshTokenController } from '../controller/auth/refreshTokenController';
import { authLoginController } from '../controller/auth/loginController';
import { authRegistrationController } from '../controller/auth/registrationController';
import { authRegistrationErrorHandler, authRegistrationValidator } from '../middlewares/auth/registrationValidator';
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
route.get('/refresh-token', refreshTokenController);


export default route;