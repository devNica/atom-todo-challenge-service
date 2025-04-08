/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import jwt from 'jsonwebtoken'
import constants from '@core/shared/constants'

import {
    type UserTokenPayload,
    type SignedSessionToken,
} from '@core/application/models/token/token'
import { type TokenHandlerPort } from '@core/application/ports/token-handler.port'
import { createFutureDate } from '@core/shared/utils/date'

class JsonWebTokenAdapter implements TokenHandlerPort {
    constructor(
        private readonly secret: string,
        private readonly expirationTime: number
    ) {}

    signSessionToken(payload: UserTokenPayload): SignedSessionToken {
        const expirationDate = createFutureDate(new Date(), this.expirationTime)

        const token = jwt.sign(payload, this.secret, {
            expiresIn: this.expirationTime,
        })

        return {
            token,
            expirationDate,
        }
    }

    verifySessionTokens(jwtToken: string, phrase: string): UserTokenPayload {
        return jwt.verify(jwtToken, phrase) as UserTokenPayload
    }
}

export const jsonWebToken = new JsonWebTokenAdapter(
    constants.JWT_SECRET_SESSION,
    Number(constants.JWT_ACCESS_EXPIRATION_TIME)
)
