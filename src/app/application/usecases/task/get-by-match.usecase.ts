import { type TaskRepositoryPort } from '@app/application/ports/repositories/task.repository.port'
import {
    type GetUserTasksByMatchPort,
    type TaskListResponse,
} from '@app/application/ports/usecases/task.usecase.port'

export class GetUserTasksByMatchUseCase implements GetUserTasksByMatchPort {
    constructor(private readonly taskRepository: TaskRepositoryPort) {}

    async run(value: string, userId: string): Promise<TaskListResponse[]> {
        const tasksFound = await this.taskRepository.fetchByMatch(value, userId)

        const task: TaskListResponse[] = tasksFound.map((task) => ({
            taskId: task.taskId,
            taskName: task.taskName,
            taskDescription: task.taskDescription,
            createdAt: task.createdAt,
            status: task.status,
        }))

        return task
    }
}
