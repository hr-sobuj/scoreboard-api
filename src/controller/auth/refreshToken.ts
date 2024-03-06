// import type { Request, RequestHandler, Response } from "express";
// import { AuthModel } from "../../model/authModel";
// import type { AuthTypes } from "../../types/authTypes";
// import jwt from 'jsonwebtoken';

// interface RequestBodyTypes extends Request {
//     body: AuthTypes
// }

// /*
// |--------------------------------------------------------------------------
// | Refresh token controller
// |--------------------------------------------------------------------------
// */
// export const refreshToken: RequestHandler<RequestBodyTypes> = async (req, res) => {

//     try {
//         const token = req.headers.authorization.split(' ')[1];
//         let { username }: any = jwt.verify(token, process.env.JWT_SECRET);
//         const user = await AuthModel.findOne({ username });
//         if (user) {
//             const regenerateToken = jwt.sign({ username }, process.env.JWT_SECRET, {
//                 expiresIn: '1h'
//             });
//             res.status(200).json({
//                 'accessToken': regenerateToken,
//                 username
//             });
//         } else {
//             res.status(500).json({
//                 msg: "Operation failed!"
//             });
//         }
//     } catch (error: any) {
//         res.status(500).json({
//             msg: "Internal Server Error"
//         });
//     }
// }
