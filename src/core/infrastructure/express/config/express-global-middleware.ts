import { type Application, json, urlencoded } from 'express'
import morgan from 'morgan'
import cors from 'cors'

export async function expressGlobalMiddleware(app: Application): Promise<void> {
    app.use(json())
    app.use(urlencoded({ extended: true }))

    app.use(cors({ origin: '*' }))
    app.use(morgan('dev'))
}
