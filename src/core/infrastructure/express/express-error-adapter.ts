/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import AppError from '@core/application/presenters/app-error'
import { type NextFunction, type Request, type Response } from 'express'
import {} from 'csrf-csrf'

export function expressErrorAdapter(
    error: Error,
    _req: Request,
    res: Response,
    next: NextFunction
): void {
    if (!error) {
        next()
        return
    }

    if (error instanceof AppError) {
        res.status(error.statusCode).json({
            meta: {
                errorName: error.name,
                messages: error.message.split(','),
            },
            message: error.message,
        })
    }
}
