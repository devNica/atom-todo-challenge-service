import { type UserRaw } from '@app/domain/entities/user.entity'
import { type UserModel } from '@app/infrastructure/repositories/user.repository'

export interface UserRepositoryPort {
    save: (data: Required<UserRaw>) => Promise<void>
    findByEmail: (email: string) => Promise<UserModel>
    findById: (userId: string) => Promise<UserModel>
    fetchAll: () => Promise<UserModel[]>
    deleteById: (userId: string)  => Promise<UserModel[]>
}
