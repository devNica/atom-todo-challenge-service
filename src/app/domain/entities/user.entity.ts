import { BaseEntity } from '@core/domain/entities/base.entity'
import { UniqueIdentificatorVO } from '@core/domain/value-objects/unique-identificator.vo'

export interface UserProps {
    email: string
    createdAt: Date
}

export type UserRaw = Omit<UserProps, 'createdAt'> & {
    userId?: string
    createdAt?: number
}

export class UserEntity extends BaseEntity<UserProps> {
    private constructor(props: UserProps, userId: UniqueIdentificatorVO) {
        super(props, userId)
    }

    static create(data: UserRaw): UserEntity {
        return new UserEntity(
            {
                email: data.email,
                createdAt: data?.createdAt
                    ? new Date(data.createdAt)
                    : new Date(),
            },
            new UniqueIdentificatorVO(data.userId)
        )
    }

    get userID(): UniqueIdentificatorVO {
        return this.id
    }

    getAllProps(): UserRaw {
        return {
            userId: this.id._value,
            email: this.props.email,
            createdAt: this.props.createdAt.getTime(),
        }
    }
}
