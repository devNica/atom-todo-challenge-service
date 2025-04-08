import {
    type SignedSessionToken,
    type UserTokenPayload,
} from '../models/token/token'

export interface TokenHandlerPort {
    signSessionToken: (payload: UserTokenPayload) => SignedSessionToken

    verifySessionTokens: (jwtToken: string, phrase: string) => UserTokenPayload
}
