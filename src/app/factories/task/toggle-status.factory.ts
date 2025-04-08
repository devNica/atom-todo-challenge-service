import { ToggleUserTaskStatusController } from '@app/application/controllers/task/toggle-status.controller'
import { ToggleUserTaskStatusUseCase } from '@app/application/usecases/task/toggle-status.usecase'
import { taskRepositoryImpl } from '@app/infrastructure/repositories/task.repository'
import { userRepositoryImpl } from '@app/infrastructure/repositories/user.repository'
import { type EmptyResponseModel } from '@core/application/models/app/app.model'
import { type ControllerPort } from '@core/application/ports/controller.port'
import { SuccessRequestPresenter } from '@core/application/presenters/success-request.presenter'

function factory(): ControllerPort {
    const usecase = new ToggleUserTaskStatusUseCase(
        taskRepositoryImpl,
        userRepositoryImpl
    )

    const presenter = new SuccessRequestPresenter<EmptyResponseModel>()

    return new ToggleUserTaskStatusController(usecase, presenter)
}

export const toggleUserTaskStatusFactory = factory()
