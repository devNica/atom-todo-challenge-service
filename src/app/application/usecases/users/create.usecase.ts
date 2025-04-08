import { type UserRepositoryPort } from '@app/application/ports/repositories/user.repository.port'
import {
    type CreateUserDTO,
    type CreateUserPort,
    type UserLoggedDTO,
} from '@app/application/ports/usecases/auth.usecase.port'
import { UserEntity, type UserRaw } from '@app/domain/entities/user.entity'
import { type TokenHandlerPort } from '@core/application/ports/token-handler.port'

export class CreateUserUseCase implements CreateUserPort {
    constructor(
        private readonly repository: UserRepositoryPort,
        private readonly tokenHandler: TokenHandlerPort
    ) {}

    async run(data: CreateUserDTO): Promise<UserLoggedDTO> {
        const newUser = UserEntity.create(data)

        await this.repository.save(newUser.getAllProps() as Required<UserRaw>)

        /** Generar token de sesion de usuario */
        const sesionToken = this.tokenHandler.signSessionToken({
            userId: newUser.userID._value,
            // roles: [], los roles en este proyecto nos son requeridos
        })

        return {
            userId: newUser.userID._value,
            email: data.email,
            token: sesionToken.token,
        }
    }
}
