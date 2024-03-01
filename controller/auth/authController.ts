import { log } from "console";
import { AuthModel } from "../../model/authModel";

const bcrypt = require('bcrypt');

export default async function AuthController(req: any, res: any) {
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