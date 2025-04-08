import { type TaskRepositoryPort } from '@app/application/ports/repositories/task.repository.port'
import {
    type ListTaskByUserPort,
    type TaskListResponse,
} from '@app/application/ports/usecases/task.usecase.port'

export class ListTaskByUserUseCase implements ListTaskByUserPort {
    constructor(private readonly taskRepository: TaskRepositoryPort) {}

    async run(userId: string): Promise<TaskListResponse[]> {
        const tasksFounds = await this.taskRepository.fetchAllByOwnerId(userId)

        const task: TaskListResponse[] = tasksFounds.map((task) => ({
            taskId: task.taskId,
            taskName: task.taskName,
            taskDescription: task.taskDescription,
            createdAt: task.createdAt,
            status: task.status,
        }))

        return task
    }
}
