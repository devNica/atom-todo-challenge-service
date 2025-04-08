import { type TaskRepositoryPort } from '@app/application/ports/repositories/task.repository.port'
import { type UserRepositoryPort } from '@app/application/ports/repositories/user.repository.port'
import {
    type CreateTaskDTO,
    type CreateTaskPort,
    type TaskListResponse,
} from '@app/application/ports/usecases/task.usecase.port'
import { TaskEntity } from '@app/domain/entities/task.entity'

export class CreateTaskUseCase implements CreateTaskPort {
    constructor(
        private readonly taskRepository: TaskRepositoryPort,
        private readonly userRepository: UserRepositoryPort
    ) {}

    async run(data: CreateTaskDTO, userId: string): Promise<TaskListResponse> {
        // Consultar al repositorio por los datos del usuario
        const user = await this.userRepository.findById(userId)

        // Construir la Entidad que Asocia la Tarea con un Usuario
        const task = TaskEntity.create({
            taskName: data.taskName,
            taskDescription: data.taskDescription,
            owner: {
                email: user.email,
                userId: user.userId,
            },
            createdAt: new Date().getTime(),
            status: true,
        })

        const taskRaw = task.getAllProps()

        // Persitir la tarea
        await this.taskRepository.save(taskRaw)

        return {
            taskId: task.taskId._value,
            taskName: taskRaw.taskName,
            taskDescription: taskRaw.taskDescription,
            createdAt: taskRaw.createdAt,
            status: taskRaw.status,
        }
    }
}
