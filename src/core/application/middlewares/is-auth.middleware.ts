import { hasRequiredKey } from '@core/shared/utils/validator'
import { type HttpRequestMiddlewareModel } from '../models/middlewares/http-request'
import { type MiddlewarePort } from '../ports/middleware.port'
import { UnAuthorizedRequestErrorPresenter } from '../presenters/unauthorized-req-error.presenter'
import { ForbiddenRequestErrorPresenter } from '../presenters/forbidden-req-error.presenter'
import { type TokenHandlerPort } from '../ports/token-handler.port'
import { type UserTokenPayload } from '../models/token/token'
import { RequestValidationErrorPresenter } from '../presenters/request-validation.presenter'
import constants from '@core/shared/constants'

export class IsAuthenticatedMiddleware
    implements MiddlewarePort<UserTokenPayload>
{
    constructor(private readonly tokenHandler: TokenHandlerPort) {}

    async handleRequest(
        request: HttpRequestMiddlewareModel
    ): Promise<UserTokenPayload> {
        if (
            !hasRequiredKey(request, 'headers') ||
            !hasRequiredKey(request.headers, 'authorization')
        ) {
            throw new UnAuthorizedRequestErrorPresenter('Token no encontrado')
        }

        const { authorization } = request.headers
        let [, token] = authorization.split(/\s+/)

        if (typeof token === 'undefined') token = ''
        else if (typeof token !== 'string') {
            throw new RequestValidationErrorPresenter(
                'Formato de Token invalido'
            )
        }

        try {
            const { userId } = this.tokenHandler.verifySessionTokens(
                token,
                constants.JWT_SECRET_SESSION
            )
            return {
                userId,
            }
        } catch (error) {
            throw new ForbiddenRequestErrorPresenter('El token ha expirado')
        }
    }
}
