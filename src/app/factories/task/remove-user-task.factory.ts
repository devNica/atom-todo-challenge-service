import { RemoveUserTaskController } from '@app/application/controllers/task/remove-user-task.controller'
import { type TaskListResponse } from '@app/application/ports/usecases/task.usecase.port'
import { RemoveUserTaskUseCase } from '@app/application/usecases/task/remove-user-task.usecase'
import { taskRepositoryImpl } from '@app/infrastructure/repositories/task.repository'
import { userRepositoryImpl } from '@app/infrastructure/repositories/user.repository'
import { type ControllerPort } from '@core/application/ports/controller.port'
import { SuccessRequestPresenter } from '@core/application/presenters/success-request.presenter'

function factory(): ControllerPort {
    const usecase = new RemoveUserTaskUseCase(
        taskRepositoryImpl,
        userRepositoryImpl
    )

    const presenter = new SuccessRequestPresenter<TaskListResponse[]>()

    return new RemoveUserTaskController(usecase, presenter)
}

export const removeTaskUserFactory = factory()
