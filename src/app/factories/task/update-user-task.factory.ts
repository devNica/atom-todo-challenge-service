import { UpdateUserTaskController } from '@app/application/controllers/task/update-user-task.controller'
import { type TaskListResponse } from '@app/application/ports/usecases/task.usecase.port'
import { UpdateUserTaskUseCase } from '@app/application/usecases/task/update-user-task.usecase'
import { taskRepositoryImpl } from '@app/infrastructure/repositories/task.repository'
import { userRepositoryImpl } from '@app/infrastructure/repositories/user.repository'
import { type ControllerPort } from '@core/application/ports/controller.port'
import { SuccessRequestPresenter } from '@core/application/presenters/success-request.presenter'

function factory(): ControllerPort {
    const usecase = new UpdateUserTaskUseCase(
        taskRepositoryImpl,
        userRepositoryImpl
    )

    const presenter = new SuccessRequestPresenter<TaskListResponse>()

    return new UpdateUserTaskController(usecase, presenter)
}

export const updateUserTaskFactory = factory()
