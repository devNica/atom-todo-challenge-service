import {
    type TaskListResponse,
    type GetUserTasksByMatchPort,
} from '@app/application/ports/usecases/task.usecase.port'
import {
    type HttpRequestModel,
    type HttpResponseModel,
} from '@core/application/models/http/http'
import { type ControllerPort } from '@core/application/ports/controller.port'
import { type PresenterPort } from '@core/application/ports/presenter.port'
import { RequestValidationErrorPresenter } from '@core/application/presenters/request-validation.presenter'

export class GetUserTasksByMatchController
    implements ControllerPort<TaskListResponse[]>
{
    constructor(
        private readonly usecase: GetUserTasksByMatchPort,
        private readonly presenter: PresenterPort<TaskListResponse[]>
    ) {}

    async handleRequest(
        request: Pick<HttpRequestModel, 'params' | 'query'>
    ): Promise<HttpResponseModel<TaskListResponse[]>> {
        if (!request.params || !request.query) {
            throw new RequestValidationErrorPresenter()
        }

        request.params as { userId: string }
        request.query as { value: string }

        const result = await this.usecase.run(
            request.query.value,
            request.params.userId
        )

        return await this.presenter.handleResponse(result, 'consulta exitosa!')
    }
}
