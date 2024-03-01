import { password } from 'bun';
import { AuthErrorHandler, AuthValidator } from '../middlewares/auth/authValidator';
import { AuthController } from '../controller/auth/authController';
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
route.post('/registration', AuthValidator, AuthErrorHandler, AuthController)


module.exports = route;