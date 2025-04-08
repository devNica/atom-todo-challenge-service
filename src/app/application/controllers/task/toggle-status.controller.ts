import { type ToggleUserTaskStatusPort } from '@app/application/ports/usecases/task.usecase.port'
import { type TaskRaw } from '@app/domain/entities/task.entity'
import { type EmptyResponseModel } from '@core/application/models/app/app.model'
import {
    type HttpRequestModel,
    type HttpResponseModel,
} from '@core/application/models/http/http'
import { type ControllerPort } from '@core/application/ports/controller.port'
import { type PresenterPort } from '@core/application/ports/presenter.port'
import { RequestValidationErrorPresenter } from '@core/application/presenters/request-validation.presenter'

export class ToggleUserTaskStatusController
    implements ControllerPort<EmptyResponseModel>
{
    constructor(
        private readonly usecase: ToggleUserTaskStatusPort,
        private readonly presenter: PresenterPort<EmptyResponseModel>
    ) {}

    async handleRequest(
        request: Pick<HttpRequestModel, 'body' | 'params'>
    ): Promise<HttpResponseModel<EmptyResponseModel>> {
        if (!request.body || !request.params) {
            throw new RequestValidationErrorPresenter()
        }

        request.params as { userId: string; taskId: string }

        await this.usecase.run(
            request.body as Required<Pick<TaskRaw, 'taskId' | 'status'>>,
            request.params.userId
        )

        return await this.presenter.handleResponse(
            {},
            'actualizacion del estado exitoso!'
        )
    }
}
