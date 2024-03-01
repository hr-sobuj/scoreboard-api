import { check, validationResult } from "express-validator";
import { AuthModel } from "../../model/authModel";
import createError from "http-errors";
import type { RequestHandler } from "express";

/*
|--------------------------------------------------------------------------
| This method validate the request body
|--------------------------------------------------------------------------
*/
export const AuthValidator: RequestHandler[] = [
    check('username')
        .isAlphanumeric()
        .withMessage('Please provide a correct username!')
        .trim()
        .custom(async (value) => {
            try {
                let result = await AuthModel.find({ username: value });
                if (result.length > 0) {
                    throw createError(400, 'Username already exists!');
                }
            } catch (error: any) {
                throw createError(500, error.message)
            }
        }),
    check('password')
        .isStrongPassword()
        .withMessage(
            'Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol',
        ),
]

/*
|--------------------------------------------------------------------------
| Here Handling the error which is generated from AuthValidator
|--------------------------------------------------------------------------
*/
export const AuthErrorHandler: RequestHandler = (req: any, res: any, next: any) => {
    const error = validationResult(req);
    const errorMapped = error.mapped();
    if (Object.keys(errorMapped).length === 0) {
        next();
    } else {
        res.status(500).json({
            msg: Object.keys(errorMapped).map(val => errorMapped[val].msg),
        });
    }
}