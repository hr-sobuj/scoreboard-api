import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_SECRET_REFRESH } from "../../config/envConfig";

interface RequestBody extends Request {
  username?: string;
  authInfo?: any
}

/*
|--------------------------------------------------------------------------
| Auth guard prevent unauthenticated user request
|--------------------------------------------------------------------------
*/
export function authGuard(req: RequestBody, res: Response, next: NextFunction) {
  const token = req.cookies.authInfo?.token;
  try {
    const isToken: any = jwt.verify(token, JWT_SECRET);

    if (isToken) {
      req.username = isToken.username;
      next();
    }
  } catch (error: any) {
    const refreshToken = req.cookies.refreshToken?.rfreshtoken;
    const isValid: any = jwt.verify(refreshToken, JWT_SECRET_REFRESH);
    const { username } = isValid;

    if (isValid) {
      const token = jwt.sign({ username }, JWT_SECRET, {
        expiresIn: '1h'
      });

      res.cookie('authInfo', { username, token }, {
        maxAge: 3600*3600000,
        httpOnly: true,
        secure: true,
        sameSite: "none"
      });

      next();
    }
  }
}
