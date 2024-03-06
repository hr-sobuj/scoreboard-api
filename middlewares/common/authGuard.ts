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
    const token = req.cookies.authInfo.token;
    try{
        const isToken: any = jwt.verify(token, process.env.JWT_SECRET);
        if (isToken) {
            req.username = isToken.username;
            next();
        }
    }
    catch(err){
        res.status(401).json({
            msg:err.message
        });
    }
}