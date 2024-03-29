// import { NextFunction, Request, Response } from "express";

// export default function responseFormatter(req: Request, res: Response, next: NextFunction) {
//     res.sendResponse = (status: number, data: any, message: string) => {
//         const response = {
//             status,
//             data,
//             message
//         };
//         res.status(status).json(response);
//     };
//     next();
// }
