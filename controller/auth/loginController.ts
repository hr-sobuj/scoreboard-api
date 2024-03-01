import type { Request, RequestHandler, Response } from "express";
import { AuthModel } from "../../model/authModel";
import type { AuthTypes } from "../../types/authTypes";
import { log } from "console";
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

interface RequestBodyTypes extends Request {
    body: AuthTypes
}

/*
|--------------------------------------------------------------------------
| Login controller
|--------------------------------------------------------------------------
*/
export const AuthLoginController: RequestHandler<RequestBodyTypes> = async (req, res) => {
    try {
        const user = await (AuthModel as any).findOneUser(req.body.username);
        if (user) {
            const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
            const {username} = user;
            if (isPasswordValid) {
                const token = jwt.sign({username}, process.env.JWT_SECRET,{
                    expiresIn:'1h'
                });
                log(token)
                res.locals.loggedUser = username;

                res.cookie('scoreboard', username, {
                    maxAge: 3600000,
                    httpOnly: true,
                    signed: true,
                });

                return res.status(200).json({
                    token,
                    msg: "Login Successfull!"
                });
            } else {
                return res.status(500).json({
                    msg: "Authentication failed!"
                })
            }
        } else {
            return res.status(500).json({
                msg: "Authentication failed!"
            })
        }
    } catch (error: any) {
        console.error("Error:", error.message);
        return res.status(500).json({
            msg: "Internal Server Error"
        });
    }
}