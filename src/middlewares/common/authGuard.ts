import type { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

interface RequestBody extends Request {
    username?: string,
}

/*
|--------------------------------------------------------------------------
| Auth guard prevent unauthenticated user request
|--------------------------------------------------------------------------
*/
export function authGuard(req: RequestBody, res: Response, next: NextFunction) {
    const token = req.cookies.scoreboard.token;
    const isToken: any = jwt.verify(token, process.env.JWT_SECRET);
    if (isToken) {
        req.username = isToken.username;
        next();
    }
}