import { UserRepositoryPort } from "@app/application/ports/repositories/user.repository.port";
import { ListRegisteredUserPort, RegisteredUserDTO } from "@app/application/ports/usecases/user.usecase.port";


export class ListRegisteredUserUseCase implements ListRegisteredUserPort {

    constructor(
        private readonly repository: UserRepositoryPort
    ) { }

    async run(): Promise<RegisteredUserDTO[]> {
        const result = await this.repository.fetchAll()

        return result.map(u => ({
            email: u.email,
            createdAt: new Date(u.createdAt).toLocaleDateString()
        }))
    }

}