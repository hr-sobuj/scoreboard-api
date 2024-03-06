import type { Request, RequestHandler, Response } from "express";
import type { AuthTypes } from "../../types/authTypes";
import jwt from 'jsonwebtoken';

interface RequestBodyTypes extends Request {
    body: AuthTypes
}

/*
|--------------------------------------------------------------------------
| Refresh token controller
|--------------------------------------------------------------------------
*/
export const refreshTokenController: RequestHandler<RequestBodyTypes> = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken.rfreshtoken;
        try {
            const isValid: any = jwt.verify(refreshToken, process.env.JWT_SECRET);
            const { username } = isValid;
            if (isValid) {
                const token = jwt.sign({username}, process.env.JWT_SECRET, {
                    expiresIn: '.01h'
                });

                const rfreshtoken = jwt.sign({ username }, process.env.JWT_SECRET);

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
                    token
                });
            }
        } catch (error) {
            res.status(500).json({
                msg: "Operation failed!"
            });
        }
    } catch (error: any) {
        res.status(500).json({
            msg: "Internal Server Error"
        });
    }
}