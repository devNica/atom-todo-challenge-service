import { type UserRepositoryPort } from '@app/application/ports/repositories/user.repository.port'
import {
    type UserLoggedDTO,
    type UserLoginDTO,
    type UserLoginPort,
} from '@app/application/ports/usecases/auth.usecase.port'
import { UserEntity } from '@app/domain/entities/user.entity'
import { type TokenHandlerPort } from '@core/application/ports/token-handler.port'

export class UserLoginUseCase implements UserLoginPort {
    constructor(
        private readonly repository: UserRepositoryPort,
        private readonly tokenHandler: TokenHandlerPort
    ) {}

    async run(data: UserLoginDTO): Promise<UserLoggedDTO> {
        const userFound = await this.repository.findByEmail(data.email)

        const user = UserEntity.create({
            userId: userFound.userId,
            email: userFound.email,
            createdAt: userFound.createdAt,
        })

        /** Generar token de sesion de usuario */
        const sesionToken = this.tokenHandler.signSessionToken({
            userId: user.userID._value,
            // roles: [], los roles en este proyecto nos son requeridos
        })

        return {
            userId: user.userID._value,
            email: data.email,
            token: sesionToken.token,
        }
    }
}
