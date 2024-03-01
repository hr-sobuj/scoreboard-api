import type { RequestHandler, Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";
import createHttpError from "http-errors";

const validateRole = ['bat', 'ball'];

export const scoreValidator: RequestHandler[] = [
    check('name')
        .notEmpty()
        .withMessage('Name field is required'),
    check('b4')
        .isNumeric()
        .withMessage('B4 field data invalid'),
    check('b6')
        .isNumeric()
        .withMessage('B6 field data invalid'),
    check('totalRun')
        .isNumeric()
        .withMessage('totalRun field data invalid'),
    check('totalBall')
        .isNumeric()
        .withMessage('totalBall field data invalid'),
    check('role')
        .custom(async (value) => {
            if (!validateRole.includes(value)) {
                throw createHttpError(500, 'Role must be bat or ball!')
            }
        })
];

export const scoreErrorHandler: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
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