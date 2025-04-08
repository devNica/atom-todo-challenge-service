import { GetUserTasksByMatchController } from '@app/application/controllers/task/get-by-match.controller'
import { type TaskListResponse } from '@app/application/ports/usecases/task.usecase.port'
import { GetUserTasksByMatchUseCase } from '@app/application/usecases/task/get-by-match.usecase'
import { taskRepositoryImpl } from '@app/infrastructure/repositories/task.repository'
import { type ControllerPort } from '@core/application/ports/controller.port'
import { SuccessRequestPresenter } from '@core/application/presenters/success-request.presenter'

function factory(): ControllerPort {
    const usecase = new GetUserTasksByMatchUseCase(taskRepositoryImpl)

    const presenter = new SuccessRequestPresenter<TaskListResponse[]>()

    return new GetUserTasksByMatchController(usecase, presenter)
}

export const getUserTaskByMatchFactory = factory()
