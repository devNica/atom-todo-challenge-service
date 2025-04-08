import {
    type TaskListResponse,
    type RemoveUserTaskPort,
} from '@app/application/ports/usecases/task.usecase.port'
import {
    type HttpRequestModel,
    type HttpResponseModel,
} from '@core/application/models/http/http'
import { type ControllerPort } from '@core/application/ports/controller.port'
import { type PresenterPort } from '@core/application/ports/presenter.port'
import { RequestValidationErrorPresenter } from '@core/application/presenters/request-validation.presenter'

export class RemoveUserTaskController
    implements ControllerPort<TaskListResponse[]>
{
    constructor(
        private readonly usecase: RemoveUserTaskPort,
        private readonly presenter: PresenterPort<TaskListResponse[]>
    ) {}

    async handleRequest(
        request: Pick<HttpRequestModel, 'params'>
    ): Promise<HttpResponseModel<TaskListResponse[]>> {
        if (!request.params) {
            throw new RequestValidationErrorPresenter()
        }

        request.params as { userId: string; taskId: string }

        const result = await this.usecase.run(
            request.params.taskId,
            request.params.userId
        )

        return await this.presenter.handleResponse(
            result,
            'eliminacion exitosa!'
        )
    }
}
