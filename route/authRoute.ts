import { AuthLoginController } from '../controller/auth/loginController';
import { AuthRegistrationController } from '../controller/auth/registrationController';
import { AuthRegistrationErrorHandler, AuthRegistrationValidator } from '../middlewares/auth/registrationValidator';
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


module.exports = route;