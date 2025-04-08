import { type NextFunction, type Request, type Response } from 'express'
import rateLimit, { type Options } from 'express-rate-limit'

/**
 * Limitar el rate de peticiones al servidor
 * solo se permitiran 20 solicitudes cada minuto
 */
export const taskRequestLimit = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minuto,
    max: 20, // 20 solicitudes en 1 minutos
    handler: (
        _req: Request,
        res: Response,
        _next: NextFunction,
        options: Options
    ) => {
        res.status(options.statusCode).json({
            meta: {
                errorName: 'Rate Limit Error',
                messages: 'Se ha superado el limite de peticiones de esta API',
            },
            message: 'Se ha superado el limite de peticiones de esta API',
        })
    },
    skip: (req: Request) => req.ip === '127.0.0.1',
    standardHeaders: true,
    legacyHeaders: true,
})

/**
 * Limitar el rate de peticiones al servidor
 * solo se permitiran 2 solicitudes cada minuto
 */
export const authRequestLimit = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minuto,
    max: 5, // 3 solicitudes en 1 minutos
    handler: (
        _req: Request,
        res: Response,
        _next: NextFunction,
        options: Options
    ) => {
        res.status(options.statusCode).json({
            meta: {
                errorName: 'Rate Limit Error',
                messages: 'Se ha superado el limite de peticiones de esta API',
            },
            message: 'Se ha superado el limite de peticiones de esta API',
        })
    },
    skip: (req: Request) => req.ip === '127.0.0.1',
    standardHeaders: true,
    legacyHeaders: true,
})
