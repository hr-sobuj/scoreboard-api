import type { NextFunction, Request, Response } from "express";

import createError from 'http-errors'

export function notFoundHandler(req: Request, res: Response, next: NextFunction) {
    next(createError(404, 'Route not found!'));
}

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    let error = process.env.NODE_ENV === 'development' ? err : { message: err.message };
    res.status(err.status || 500);
    res.json(error)
}