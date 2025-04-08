import { ListTaskByUserController } from '@app/application/controllers/task/list-by-user.controller'
import { type TaskListResponse } from '@app/application/ports/usecases/task.usecase.port'
import { ListTaskByUserUseCase } from '@app/application/usecases/task/list-by-user.usecase'
import { taskRepositoryImpl } from '@app/infrastructure/repositories/task.repository'
import { type ControllerPort } from '@core/application/ports/controller.port'
import { SuccessRequestPresenter } from '@core/application/presenters/success-request.presenter'

function factory(): ControllerPort {
    const usecase = new ListTaskByUserUseCase(taskRepositoryImpl)

    const presenter = new SuccessRequestPresenter<TaskListResponse[]>()

    return new ListTaskByUserController(usecase, presenter)
}

export const listTaskByUserFactory = factory()
