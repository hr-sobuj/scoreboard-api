import bcrypt from "bcrypt";
import type { Request, RequestHandler, Response } from "express";
import { NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_SECRET_REFRESH } from "./../../../config/envConfig";
import type { RequestBodyTypes } from "./auth.interface";
import { AuthModel } from "./auth.model";


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
                    maxAge: 3600 * 3600000,
                    httpOnly: true,
                    secure: true,
                    sameSite: "none"
                });

                res.cookie('refreshToken', { username, rfreshtoken }, {
                    maxAge: 3600 * 3600000,
                    httpOnly: true,
                    secure: true,
                    sameSite: "none"
                });

                res.status(200).json({
                    token,
                    msg: "Login Successfull!",
                    avatar: user.avatar,
                    role: user.role,
                    id: user?._id,
                    user
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


/*
|--------------------------------------------------------------------------
| Refresh Token controller
|--------------------------------------------------------------------------
*/
export const refreshTokenController = async (req: Request, res: Response) => {
    try {
        const refreshToken = req.cookies.refreshToken.rfreshtoken;
        try {
            const isValid: any = jwt.verify(refreshToken, JWT_SECRET);
            const { username } = isValid;
            if (isValid) {
                const token = jwt.sign({ username }, JWT_SECRET, {
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
                    secure: true,
                    sameSite: "none"
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


/*
|--------------------------------------------------------------------------
| Registration controller
|--------------------------------------------------------------------------
*/
export const authRegistrationController = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        const requestBody = {
            ...req.body,
            password: hashPassword,
            avatar: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png'
        };

        const newUser = new AuthModel(requestBody);
        await newUser.save();

        if (newUser) {
            res.json({
                message: "User Registration Successful!",
            });
        }
    } catch (error: any) {
        next(error.message);
    }
};


export const avatarUpload = async (req: Request, res: Response) => {
    const { id } = req.params;
    let avatar = null;
    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
        avatar = req.files[0].filename;
    }

    try {
        const result = await AuthModel.findByIdAndUpdate(
            { _id: id },
            { $set: { avatar: avatar } },
            { new: true, useFindAndModify: false }
        );
        res.status(200).json({
            message: "Profile picture updated successfully!",
            result
        });
    } catch (error) {
        res.status(500).json({
            error: "There was a server side error!",
        });
    }
}