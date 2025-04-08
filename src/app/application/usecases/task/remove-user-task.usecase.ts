import { type TaskRepositoryPort } from '@app/application/ports/repositories/task.repository.port'
import { type UserRepositoryPort } from '@app/application/ports/repositories/user.repository.port'
import {
    type RemoveUserTaskPort,
    type TaskListResponse,
} from '@app/application/ports/usecases/task.usecase.port'

export class RemoveUserTaskUseCase implements RemoveUserTaskPort {
    constructor(
        private readonly taskRepository: TaskRepositoryPort,
        private readonly userRepository: UserRepositoryPort
    ) {}

    async run(taskId: string, userId: string): Promise<TaskListResponse[]> {
        const user = await this.userRepository.findById(userId)

        const tasks = await this.taskRepository.deleteTask(taskId, user.userId)

        const task: TaskListResponse[] = tasks.map((task) => ({
            taskId: task.taskId,
            taskName: task.taskName,
            taskDescription: task.taskDescription,
            createdAt: task.createdAt,
            status: task.status,
        }))

        return task
    }
}
