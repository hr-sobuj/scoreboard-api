import type { NextFunction, Request, RequestHandler, Response } from "express";

export default function createAsync(handler: RequestHandler) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            handler(req, res, next);
        } catch (error) {
            next(error);
        }
    };
}