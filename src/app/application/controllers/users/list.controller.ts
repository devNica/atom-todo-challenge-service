import { ListRegisteredUserPort, RegisteredUserDTO } from "@app/application/ports/usecases/user.usecase.port"
import { HttpRequestModel, HttpResponseModel } from "@core/application/models/http/http"
import { ControllerPort } from "@core/application/ports/controller.port"
import { PresenterPort } from "@core/application/ports/presenter.port"

export class ListRegisteredUserController
    implements ControllerPort<RegisteredUserDTO[]>
{
    constructor(
        private readonly usecase: ListRegisteredUserPort,
        private readonly presenter: PresenterPort<RegisteredUserDTO[]>
    ) {}

    async handleRequest(
        _request: HttpRequestModel
    ): Promise<HttpResponseModel<RegisteredUserDTO[]>> {
       

        const result = await this.usecase.run()

        return await this.presenter.handleResponse(result, 'consulta exitosa!')
    }
}