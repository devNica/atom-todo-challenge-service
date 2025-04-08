import {
    type CreateTaskDTO,
    type CreateTaskPort,
    type TaskListResponse,
} from '@app/application/ports/usecases/task.usecase.port'
import {
    type HttpRequestModel,
    type HttpResponseModel,
} from '@core/application/models/http/http'
import { type ControllerPort } from '@core/application/ports/controller.port'
import { type PresenterPort } from '@core/application/ports/presenter.port'
import { RequestValidationErrorPresenter } from '@core/application/presenters/request-validation.presenter'

export class CreateTaskController implements ControllerPort<TaskListResponse> {
    constructor(
        private readonly usecase: CreateTaskPort,
        private readonly presenter: PresenterPort<TaskListResponse>
    ) {}

    async handleRequest(
        request: Pick<HttpRequestModel, 'body' | 'params'>
    ): Promise<HttpResponseModel<TaskListResponse>> {
        if (!request.body || !request.params) {
            throw new RequestValidationErrorPresenter()
        }

        request.params as { userId: string }

        const result = await this.usecase.run(
            request.body as CreateTaskDTO,
            request.params.userId
        )

        return await this.presenter.handleResponse(result, 'registro exitoso!')
    }
}
