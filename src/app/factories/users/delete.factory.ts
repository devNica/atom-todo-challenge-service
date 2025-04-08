import { RemoveUserController } from "@app/application/controllers/users/delete.controller"
import { RegisteredUserDTO } from "@app/application/ports/usecases/user.usecase.port"
import { RemoveUserUseCase } from "@app/application/usecases/users/delete.usecase"
import { taskRepositoryImpl } from "@app/infrastructure/repositories/task.repository"
import { userRepositoryImpl } from "@app/infrastructure/repositories/user.repository"
import { ControllerPort } from "@core/application/ports/controller.port"
import { SuccessRequestPresenter } from "@core/application/presenters/success-request.presenter"


function factory(): ControllerPort {
    const usecase = new RemoveUserUseCase(
        userRepositoryImpl,
        taskRepositoryImpl
    )

    const presenter = new SuccessRequestPresenter<RegisteredUserDTO[]>()

    return new RemoveUserController(usecase, presenter)
}

export const removeUserFactory = factory()