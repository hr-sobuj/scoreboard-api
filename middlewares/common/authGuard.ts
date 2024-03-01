import { log } from "console";
import type { NextFunction,Request,Response } from "express";
const jwt=require('jsonwebtoken');

interface RequestBody extends Request{
    username?:string,
}

/*
|--------------------------------------------------------------------------
| Auth guard prevent unauthenticated user request
|--------------------------------------------------------------------------
*/
export function authGuard(req: RequestBody, res: Response, next: NextFunction) {
    log(req.headers);
    const token = req.headers['authorization']?.split(' ')[1];
    const isToken=jwt.verify(token,process.env.JWT_SECRET);
    if(isToken){
        req.username=isToken.username;
        next();
    } 
}