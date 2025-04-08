import { type TaskRepositoryPort } from '@app/application/ports/repositories/task.repository.port'
import { type UserRepositoryPort } from '@app/application/ports/repositories/user.repository.port'
import { type ToggleUserTaskStatusPort } from '@app/application/ports/usecases/task.usecase.port'
import { type TaskRaw } from '@app/domain/entities/task.entity'

export class ToggleUserTaskStatusUseCase implements ToggleUserTaskStatusPort {
    constructor(
        private readonly taskRepository: TaskRepositoryPort,
        private readonly userRepository: UserRepositoryPort
    ) {}

    async run(
        task: Required<Pick<TaskRaw, 'taskId' | 'status'>>,
        userId: string
    ): Promise<void> {
        const user = await this.userRepository.findById(userId)

        await this.taskRepository.updateStatus(task, user.userId)
    }
}
