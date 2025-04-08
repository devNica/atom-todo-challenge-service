import { type UserRepositoryPort } from '@app/application/ports/repositories/user.repository.port'
import { type UserRaw } from '@app/domain/entities/user.entity'
import {
    MaximumStoreSizeError,
    UniqueConstraintError,
} from '@core/application/models/validators/errors'
import { type CacheServicePort } from '@core/application/ports/cache.port'
import { ConflictErrorPresenter } from '@core/application/presenters/conflict-error-presenter'
import { RepositoryErrorPresenter } from '@core/application/presenters/repository-error.presenter'
import { CacheService } from '@core/application/services/cache.service'
import { localStorageAdapter } from '@core/infrastructure/localstorage/localstorage.adapter'
import constants from '@core/shared/constants'

const { STORAGES } = constants

export type UserModel = Required<UserRaw>

class UserRepository implements UserRepositoryPort {
    private readonly storeName = STORAGES.auth
    private readonly maxStoreSize = 15

    constructor(private readonly cacheSrv: CacheServicePort<UserModel>) { }


    async deleteById(userId: string): Promise<UserModel[]> {
        try {

            // Recuperar las tareas de terceros
            const newUserList =
                await this.cacheSrv.getAndFilterStoreByParams({
                    keyToFilter: 'userId', // buscar por nombre de la tarea
                    storeName: this.storeName, // buscar en el store de las tareas
                    valueToFilter: userId,
                    type: 0, // los resultados deben excluir el valor si lo encuentra
                })

            // Persistir los cambios se reescribe el store
            await this.cacheSrv.rewriteStoreByName(this.storeName, newUserList)

            return newUserList

        } catch (error) {
            throw new RepositoryErrorPresenter(String(error), 'UserRepository')
        }
    }


    async fetchAll(): Promise<UserModel[]> {
        try {

            return await this.cacheSrv.getStoreByName(this.storeName)

        } catch (error) {
            throw new RepositoryErrorPresenter(String(error), 'UserRepository')
        }
    }

    async findById(userId: string): Promise<UserModel> {
        try {
            const users = await this.cacheSrv.getAndFilterStoreByParams({
                keyToFilter: 'userId', // buscar por email
                storeName: this.storeName, // buscar en el store de los usuarios
                valueToFilter: userId,
                type: 1, // los resultados deben incluir el valor si lo encuentra
            })

            if (!users.length) {
                throw new Error('Usuario no encontrado')
            }

            return users[0]
        } catch (error) {
            throw new RepositoryErrorPresenter(String(error), 'UserRepository')
        }
    }

    async findByEmail(email: string): Promise<UserModel> {
        try {
            const users = await this.cacheSrv.getAndFilterStoreByParams({
                keyToFilter: 'email', // buscar por email
                storeName: this.storeName, // buscar en el store de los usuarios
                valueToFilter: email,
                type: 1, // los resultados deben incluir el valor si lo encuentra
            })

            if (!users.length) {
                throw new Error('Usuario no encontrado')
            }

            return users[0]
        } catch (error) {
            throw new RepositoryErrorPresenter(String(error), 'UserRepository')
        }
    }

    async save(data: Required<UserRaw>): Promise<void> {
        try {
            const len = await this.cacheSrv.storeSize(this.storeName)

            // Verificar si se ha alcanzado el maximo de objetos de tipo User
            if (this.maxStoreSize > len) {
                const result = await this.cacheSrv.getAndFilterStoreByParams({
                    keyToFilter: 'email', // buscar por email
                    storeName: this.storeName, // buscar en el store de los usuarios
                    valueToFilter: data.email,
                    type: 1, // los resultados deben incluir el valor si lo encuentra
                })

                if (result.length > 0) {
                    throw new UniqueConstraintError(
                        'No pueden haber dos cuentas registradas con el mismo correo'
                    )
                }

                await this.cacheSrv.updateStoreByName(
                    {
                        storeName: this.storeName,
                        keyToFilter: 'userId',
                        valueToFilter: data.userId,
                    },
                    {
                        ...data,
                    }
                )
            } else {
                throw new MaximumStoreSizeError(
                    'Se ha alcanzado la cuota maxima de usuarios permitida'
                )
            }
        } catch (error) {
            if (
                error instanceof UniqueConstraintError ||
                error instanceof MaximumStoreSizeError
            ) {
                throw new ConflictErrorPresenter(error.message)
            }

            throw new RepositoryErrorPresenter(String(error), 'UserRepository')
        }
    }
}

export const userRepositoryImpl = new UserRepository(
    new CacheService<UserModel>(localStorageAdapter)
)
