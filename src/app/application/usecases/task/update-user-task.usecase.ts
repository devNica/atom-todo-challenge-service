import { type TaskRepositoryPort } from '@app/application/ports/repositories/task.repository.port'
import { type UserRepositoryPort } from '@app/application/ports/repositories/user.repository.port'
import {
    type TaskListResponse,
    type UpdateTaskDTO,
    type UpdateUserTaskPort,
} from '@app/application/ports/usecases/task.usecase.port'

export class UpdateUserTaskUseCase implements UpdateUserTaskPort {
    constructor(
        private readonly taskRepository: TaskRepositoryPort,
        private readonly userRepository: UserRepositoryPort
    ) {}

    async run(data: UpdateTaskDTO, userId: string): Promise<TaskListResponse> {
        /**
         * Verificar la existencia del usuario en la base de datos
         * Es requisito debido a que se podria cumplir la restriccion
         * del formato del identificador, pero asu vez no exitir
         * ningun registro asociado al mismo
         */
        const user = await this.userRepository.findById(userId)

        const taskRaw = await this.taskRepository.updateTask(
            {
                taskId: data.taskId,
                taskName: data.taskName,
                taskDescription: data.taskDescription,
            },
            user.userId
        )

        return {
            ...taskRaw,
        }
    }
}
