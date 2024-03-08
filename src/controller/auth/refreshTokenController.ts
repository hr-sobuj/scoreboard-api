import type { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_SECRET_REFRESH } from "../../config/envConfig";


export const refreshTokenController = async (req:Request, res:Response) => {
    try {
        const refreshToken = req.cookies.refreshToken.rfreshtoken;
        try {
            const isValid: any = jwt.verify(refreshToken, JWT_SECRET);
            const { username } = isValid;
            if (isValid) {
                const token = jwt.sign({username}, JWT_SECRET, {
                    expiresIn: '.01h'
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