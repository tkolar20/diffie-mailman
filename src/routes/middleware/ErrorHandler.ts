import { ErrorRequestHandler } from "express";
import ResponseError from "../../interfaces/IError.js";

export const errorHandler: ErrorRequestHandler = (err: ResponseError, req, res, next) =>
{
    const statusCode = err.status || 500;
    const message = err.message || "Internal Server Error.";
    res.status(statusCode).json({ error: message });
};