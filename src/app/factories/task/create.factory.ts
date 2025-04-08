import { CreateTaskController } from '@app/application/controllers/task/create.controller'
import { type TaskListResponse } from '@app/application/ports/usecases/task.usecase.port'
import { CreateTaskUseCase } from '@app/application/usecases/task/create.usecase'
import { taskRepositoryImpl } from '@app/infrastructure/repositories/task.repository'
import { userRepositoryImpl } from '@app/infrastructure/repositories/user.repository'
import { type ControllerPort } from '@core/application/ports/controller.port'
import { SuccessfullyCreatedResourcePresenter } from '@core/application/presenters/successfully-created-resource.presenter'

function factory(): ControllerPort {
    const usecase = new CreateTaskUseCase(
        taskRepositoryImpl,
        userRepositoryImpl
    )

    const presenter =
        new SuccessfullyCreatedResourcePresenter<TaskListResponse>()

    return new CreateTaskController(usecase, presenter)
}

export const createTaskFactory = factory()
