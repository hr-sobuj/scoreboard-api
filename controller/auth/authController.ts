import type { Request, RequestHandler, Response } from "express";
import { AuthModel } from "../../model/authModel";
import type { AuthTypes } from "../../types/authTypes";
const bcrypt = require('bcrypt')

interface RequestBodyTypes extends Request {
    body: AuthTypes
}

export const AuthController: RequestHandler<RequestBodyTypes> = async (req, res) => {
    try {
        const hashPassword = await bcrypt.hash(req.body.password, 10,)
        const requestBody = {
            ...req.body,
            password: hashPassword
        }

        const newUser = new AuthModel(requestBody);
        newUser.save();

        if (newUser) {
            res.json({
                message: "User Registration Successfull!"
            });
        }

    } catch (error: any) {

    }
}