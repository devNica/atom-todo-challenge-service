import { TaskRepositoryPort } from "@app/application/ports/repositories/task.repository.port";
import { UserRepositoryPort } from "@app/application/ports/repositories/user.repository.port";
import { RegisteredUserDTO, RemoveUserPort } from "@app/application/ports/usecases/user.usecase.port";


export class RemoveUserUseCase implements RemoveUserPort {

    constructor(
        private readonly userRepository: UserRepositoryPort,
        private readonly taskRepository: TaskRepositoryPort
    ) { }

    async run(email: string): Promise<RegisteredUserDTO[]> {

        /** Buscar al usaurio en el Store */
        const userFound = await this.userRepository.findByEmail(email)
        
        /** Remover al usuario del Store */
        const result = await this.userRepository.deleteById(userFound.userId)

        /** Remover todas las tareas asociadas al usuario */
        await this.taskRepository.deleteAllTasks(userFound.userId)

        return result.map(u => ({
            email: u.email,
            createdAt: new Date(u.createdAt).toLocaleDateString()
        }))
    }

}