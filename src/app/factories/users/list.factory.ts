import { ListRegisteredUserController } from "@app/application/controllers/users/list.controller"
import { RegisteredUserDTO } from "@app/application/ports/usecases/user.usecase.port"
import { ListRegisteredUserUseCase } from "@app/application/usecases/users/list.usecase"
import { userRepositoryImpl } from "@app/infrastructure/repositories/user.repository"
import { ControllerPort } from "@core/application/ports/controller.port"
import { SuccessRequestPresenter } from "@core/application/presenters/success-request.presenter"


function factory(): ControllerPort {
    const usecase = new ListRegisteredUserUseCase(userRepositoryImpl)

    const presenter = new SuccessRequestPresenter<RegisteredUserDTO[]>()

    return new ListRegisteredUserController(usecase, presenter)
}

export const listRegisteredUserFactory = factory()