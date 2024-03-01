import type { NextFunction, Request, Response } from "express";

const createError = require('http-errors');

function notFoundHandler(req: Request, res: Response, next: NextFunction) {
    next(createError(404, 'Route not found!'));
}

function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    let error = process.env.NODE_ENV === 'development' ? err : { message: err.message };
    res.status(err.status || 500);
    res.json(error)
}

module.exports = {
    notFoundHandler,
    errorHandler
}