import { type EndPointModel } from '@core/presentation/models/api/endpoint.model'
import { expressGlobalMiddleware } from '@core/infrastructure/express/config/express-global-middleware'
import { expressHandleError } from '@core/infrastructure/express/config/express-handle-error'
import { expressHandleRoutes } from '@core/infrastructure/express/config/express-handle-routes'
import { type Server } from 'http'
import { expressSetupSecurity } from './config/express-setup-security'
import { type LoggerPort } from '@core/application/ports/logger.port'
import { authRoutes } from '@app/presentation/endpoints/auth.router'
import { userRouter } from '@app/presentation/endpoints/user.router'
import express, { type Application } from 'express'
import http from 'http'
import cors from 'cors'

export class ExpressServerAdapter {
    private readonly controllers: EndPointModel[] = []
    private readonly expressApp: Application
    private readonly server: Server

    constructor(
        private readonly serverPort: number,
        private readonly prefix: string,
        private readonly logger: LoggerPort
    ) {
        this.expressApp = express()
        this.server = http.createServer(
            this.expressApp.use(cors({ origin: '*' }))
        )
    }

    private controllerRegister(): void {
        this.controllers.push({
            path: `/${this.prefix}/auth`,
            controller: authRoutes,
        })

        this.controllers.push({
            path: `/${this.prefix}/users`,
            controller: userRouter,
        })
    }

    public async start(): Promise<void> {
        this.controllerRegister()
        await expressSetupSecurity(this.expressApp)
        await expressGlobalMiddleware(this.expressApp)

        await expressHandleRoutes(this.expressApp, this.controllers)
        await expressHandleError(this.expressApp)

        this.server.listen(this.serverPort, () => {
            this.logger.LogInfo(
                `🚀 Server is running on port: ${String(this.serverPort)}`
            )
        })
    }
}
