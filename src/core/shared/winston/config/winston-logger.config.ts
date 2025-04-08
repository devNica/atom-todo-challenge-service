import { format, transports } from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
import path from 'path'

const { timestamp, combine, colorize, errors, json, printf, simple } = format

/* eslint-disable @typescript-eslint/restrict-template-expressions, @typescript-eslint/strict-boolean-expressions */
const formatLogger = printf(
    ({ level, message, timestamp, stack }) =>
        `${timestamp} ${level} ${stack || message}`
)

const logsDirectory = path.resolve(process.cwd(), 'logs')

export const loggerOnDevelopment = {
    format: combine(
        simple(),
        colorize(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),

        errors({ stack: true }),
        formatLogger
    ),
    defaultMeta: { service: 'auth-ms' },
    transports: [
        new transports.Console(),
        new DailyRotateFile({
            filename: 'logs/app-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxFiles: '14d', // Mantener logs por 14 dias
        }),
    ],
}

export const loggerOnProduction = {
    format: combine(timestamp(), errors({ stack: true }), json()),
    defaultMeta: { service: 'auth-ms' },
    transports: [
        new transports.File({
            maxsize: 512000,
            maxFiles: 5,
            filename: path.join(logsDirectory, 'full.log'),
        }),
    ],
}
