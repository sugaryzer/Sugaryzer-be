import {Response, Request, NextFunction} from "express";
import {ZodError} from "zod";
import {ResponseError} from "../error/response-error";
/* eslint-disable @typescript-eslint/no-unused-vars */
export const errorMiddleware = async (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof ZodError) {
        res.status(400).json({
            error: true,
            message: `Validation Error : ${JSON.stringify(error)}`
        });
    } else if (error instanceof ResponseError) {
        res.status(error.status).json({
            error: true,
            message: error.message
        });
    } else {
        res.status(500).json({
            error: true,
            message: error.message
        });
    }
}