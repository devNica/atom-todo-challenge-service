import { BaseEntity } from '@core/domain/entities/base.entity'
import { UserEntity, type UserRaw } from './user.entity'
import { UniqueIdentificatorVO } from '@core/domain/value-objects/unique-identificator.vo'

export interface TaskProps {
    taskName: string
    taskDescription: string
    status: boolean
    createdAt: number
    owner: UserEntity
}

export type TaskRaw = Omit<TaskProps, 'owner' | 'status'> & {
    taskId?: string
    status?: boolean
    owner: UserRaw
}

export class TaskEntity extends BaseEntity<TaskProps> {
    private constructor(props: TaskProps, taskId: UniqueIdentificatorVO) {
        super(props, taskId)
    }

    static create(data: TaskRaw): TaskEntity {
        const owner = UserEntity.create(data.owner)

        return new TaskEntity(
            {
                taskName: data.taskName,
                taskDescription: data.taskDescription,
                owner,
                createdAt: data.createdAt,
                status: data?.status ?? true,
            },
            new UniqueIdentificatorVO(data.taskId)
        )
    }

    get taskId(): UniqueIdentificatorVO {
        return this.id
    }

    getAllProps(): Required<TaskRaw> {
        return {
            taskId: this.id._value,
            owner: this.props.owner.getAllProps(),
            createdAt: this.props.createdAt,
            status: this.props.status,
            taskDescription: this.props.taskDescription,
            taskName: this.props.taskName,
        }
    }
}
