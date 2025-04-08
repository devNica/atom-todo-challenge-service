import { authSchema } from '@app/application/schemas/auth.schemas'
import { createUserFactory } from '@app/factories/users/create.factory'
import { userLoginFactory } from '@app/factories/users/login.factory'
import { authRequestLimit } from '@app/infrastructure/repositories/http/rate-limit'
import { validatorSchemaFactory } from '@core/factories/validator-schema'
import { expressMiddlewareAdapter } from '@core/infrastructure/express/express-middleware-adapter'
import { expressRouteAdapter } from '@core/infrastructure/express/express-route-adapter'
import { Router } from 'express'

export const authRoutes = Router()

/** Limitador de peticiones para las autenticacion de usuario */
authRoutes.use(authRequestLimit)

authRoutes.post(
    '/register',
    expressMiddlewareAdapter(validatorSchemaFactory(authSchema)),
    expressRouteAdapter(createUserFactory)
)
authRoutes.post(
    '/login',
    expressMiddlewareAdapter(validatorSchemaFactory(authSchema)),
    expressRouteAdapter(userLoginFactory)
)
