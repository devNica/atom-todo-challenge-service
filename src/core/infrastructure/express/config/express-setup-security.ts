import { type Application } from 'express'
import helmet from 'helmet'

export async function expressSetupSecurity(app: Application): Promise<void> {
    app.set('trust proxy', false)
    app.disabled('x-powered-by')
    app.use(helmet())

    /**
     * En esta funcion se pueden agregar configuraciones de cookies y CSRF
     */
}
