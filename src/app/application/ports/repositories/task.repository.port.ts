import { type TaskRaw } from '@app/domain/entities/task.entity'
import { type TaskModel } from '@app/infrastructure/repositories/task.repository'

export interface TaskRepositoryPort {
    save: (data: Required<TaskRaw>) => Promise<void>
    fetchAllByOwnerId: (ownerId: string) => Promise<TaskModel[]>
    updateTask: (
        data: Required<Omit<TaskRaw, 'owner' | 'status' | 'createdAt'>>,
        ownerId: string
    ) => Promise<TaskModel>
    deleteTask: (taskId: string, ownerId: string) => Promise<TaskModel[]>
    updateStatus: (
        task: Required<Pick<TaskRaw, 'taskId' | 'status'>>,
        ownerId: string
    ) => Promise<void>
    fetchByMatch: (value: string, ownerId: string) => Promise<TaskModel[]>
}
