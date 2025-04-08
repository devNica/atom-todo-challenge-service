import { RegisteredUserDTO, RemoveUserPort } from "@app/application/ports/usecases/user.usecase.port"
import { HttpRequestModel, HttpResponseModel } from "@core/application/models/http/http"
import { ControllerPort } from "@core/application/ports/controller.port"
import { PresenterPort } from "@core/application/ports/presenter.port"
import { RequestValidationErrorPresenter } from "@core/application/presenters/request-validation.presenter"


export class RemoveUserController
    implements ControllerPort<RegisteredUserDTO[]> {
    constructor(
        private readonly usecase: RemoveUserPort,
        private readonly presenter: PresenterPort<RegisteredUserDTO[]>
    ) { }

    async handleRequest(
        request: Pick<HttpRequestModel, 'body'>
    ): Promise<HttpResponseModel<RegisteredUserDTO[]>> {

        if (!request.body) {
            throw new RequestValidationErrorPresenter()
        }

        request.body as { email: string }

        const result = await this.usecase.run(request.body.email)

        return await this.presenter.handleResponse(result, 'eliminacion exitosa!')
    }
}