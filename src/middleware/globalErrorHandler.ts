import { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";
import { config } from './../../config/config';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const globalErrorHandler = (err: HttpError, req: Request, res: Response, next: NextFunction) => {
    const statsCode =  err.statusCode || 500;
    res.status(statsCode).json({
        message : err.message,
        errorStack : config.env === 'dev'? err.stack : ''
    });
}