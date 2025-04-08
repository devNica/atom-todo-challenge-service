import { CreateUserController } from '@app/application/controllers/auth/create.controller'
import { type UserLoggedDTO } from '@app/application/ports/usecases/auth.usecase.port'
import { CreateUserUseCase } from '@app/application/usecases/users/create.usecase'
import { userRepositoryImpl } from '@app/infrastructure/repositories/user.repository'
import { type ControllerPort } from '@core/application/ports/controller.port'
import { SuccessfullyCreatedResourcePresenter } from '@core/application/presenters/successfully-created-resource.presenter'
import { jsonWebToken } from '@core/infrastructure/jwt/token-security-adapter'

function factory(): ControllerPort {
    const usecase = new CreateUserUseCase(userRepositoryImpl, jsonWebToken)

    const presenter = new SuccessfullyCreatedResourcePresenter<UserLoggedDTO>()

    return new CreateUserController(usecase, presenter)
}

export const createUserFactory = factory()
