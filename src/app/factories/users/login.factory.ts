import { LoginController } from '@app/application/controllers/auth/login.controller'
import { type UserLoggedDTO } from '@app/application/ports/usecases/auth.usecase.port'
import { UserLoginUseCase } from '@app/application/usecases/users/login.usecase'
import { userRepositoryImpl } from '@app/infrastructure/repositories/user.repository'
import { type ControllerPort } from '@core/application/ports/controller.port'
import { SuccessRequestPresenter } from '@core/application/presenters/success-request.presenter'
import { jsonWebToken } from '@core/infrastructure/jwt/token-security-adapter'

function factory(): ControllerPort {
    const usecase = new UserLoginUseCase(userRepositoryImpl, jsonWebToken)

    const presenter = new SuccessRequestPresenter<UserLoggedDTO>()

    return new LoginController(usecase, presenter)
}

export const userLoginFactory = factory()
