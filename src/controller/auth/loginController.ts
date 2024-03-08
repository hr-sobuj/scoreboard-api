import type { Request, RequestHandler, Response } from "express";
import { AuthModel } from "../../model/authModel";
import type { AuthTypes } from "../../types/authTypes";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_SECRET_REFRESH } from "../../config/envConfig";

interface RequestBodyTypes extends Request {
  body: AuthTypes;
}

/*
|--------------------------------------------------------------------------
| Login controller
|--------------------------------------------------------------------------
*/
export const authLoginController: RequestHandler<RequestBodyTypes> = async (
  req,
  res
) => {
  try {
    const user = await (AuthModel as any).findOneUser(req.body.username);
    if (user) {
      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user.password
      );
      const { username } = user;
      if (isPasswordValid) {
        const token = jwt.sign({ username }, JWT_SECRET, {
          expiresIn: "1h",
        });

        const rfreshtoken = jwt.sign({ username }, JWT_SECRET_REFRESH);

        res.cookie('authInfo', { username, token }, {
          maxAge: 3600000,
          httpOnly: true,
          secure: true,
          sameSite: "none"
      });

      res.cookie('refreshToken', { username, rfreshtoken }, {
          maxAge: 3600000,
          httpOnly: true,
          secure:true,
          sameSite:"none"
      });

        res.status(200).json({
          token,
          msg: "Login Successfull!",
        });
      } else {
        res.status(500).json({
          msg: "Authentication failed!",
        });
      }
    } else {
      res.status(500).json({
        msg: "Authentication failed!",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};
