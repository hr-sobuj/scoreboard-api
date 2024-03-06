import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/envConfig";

interface RequestBody extends Request {
  username?: string;
}

/*
|--------------------------------------------------------------------------
| Auth guard prevent unauthenticated user request
|--------------------------------------------------------------------------
*/
export function authGuard(req: RequestBody, res: Response, next: NextFunction) {
  const token = req.cookies.scoreboard.token;
  const isToken: any = jwt.verify(token, JWT_SECRET);
  if (isToken) {
    req.username = isToken.username;
    next();
  }
}
