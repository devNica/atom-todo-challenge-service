import { type TaskRaw } from '@app/domain/entities/task.entity'

export interface CreateTaskDTO {
    taskName: string
    taskDescription: string
}

export interface UpdateTaskDTO {
    taskId: string
    taskName: string
    taskDescription: string
}

export type CreateTaskResponse = Required<Pick<TaskRaw, 'taskId'>>

export type TaskListResponse = Required<Omit<TaskRaw, 'owner'>>

export interface CreateTaskPort {
    run: (data: CreateTaskDTO, userId: string) => Promise<TaskListResponse>
}

export interface ListTaskByUserPort {
    run: (userId: string) => Promise<TaskListResponse[]>
}

export interface UpdateUserTaskPort {
    run: (data: UpdateTaskDTO, userId: string) => Promise<TaskListResponse>
}

export interface RemoveUserTaskPort {
    run: (taskId: string, userId: string) => Promise<TaskListResponse[]>
}

export interface ToggleUserTaskStatusPort {
    run: (
        task: Required<Pick<TaskRaw, 'taskId' | 'status'>>,
        userId: string
    ) => Promise<void>
}

export interface GetUserTasksByMatchPort {
    run: (value: string, userId: string) => Promise<TaskListResponse[]>
}
