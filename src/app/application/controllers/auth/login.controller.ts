import {
    type UserLoggedDTO,
    type UserLoginDTO,
    type UserLoginPort,
} from '@app/application/ports/usecases/auth.usecase.port'
import {
    type HttpRequestModel,
    type HttpResponseModel,
} from '@core/application/models/http/http'
import { type ControllerPort } from '@core/application/ports/controller.port'
import { type PresenterPort } from '@core/application/ports/presenter.port'
import { RequestValidationErrorPresenter } from '@core/application/presenters/request-validation.presenter'

export class LoginController implements ControllerPort<UserLoggedDTO> {
    constructor(
        private readonly usecase: UserLoginPort,
        private readonly presenter: PresenterPort<UserLoggedDTO>
    ) {}

    async handleRequest(
        request: Pick<HttpRequestModel, 'body'>
    ): Promise<HttpResponseModel<UserLoggedDTO>> {
        if (!request.body) {
            throw new RequestValidationErrorPresenter()
        }
        const result = await this.usecase.run(request.body as UserLoginDTO)
        return await this.presenter.handleResponse(
            result,
            'Inicion de sesion Exitoso!'
        )
    }
}
