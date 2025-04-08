import { type MiddlewarePort } from '@core/application/ports/middleware.port'
import type AppError from '@core/application/presenters/app-error'
import { type NextFunction, type Request, type Response } from 'express'

export function expressMiddlewareAdapter(middleware: MiddlewarePort) {
    return async (request: Request, _res: Response, next: NextFunction) => {
        await Promise.resolve(
            middleware
                .handleRequest({
                    body: request.body,
                    params: request.params,
                    query: request.query,
                    headers: request.headers,
                    method: request.method,
                })
                .then(() => {
                    request.body = { ...request.body, ...request.params }
                    next()
                })
                .catch((err: AppError) => {
                    next(err)
                })
        )
    }
}
