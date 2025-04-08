import { type TaskRepositoryPort } from '@app/application/ports/repositories/task.repository.port'
import { type TaskRaw } from '@app/domain/entities/task.entity'
import {
    MaximumStoreSizeError,
    RelationShipConstraintError,
    UniqueConstraintError,
} from '@core/application/models/validators/errors'
import { type CacheServicePort } from '@core/application/ports/cache.port'
import { ConflictErrorPresenter } from '@core/application/presenters/conflict-error-presenter'
import { InternalServerErrorPresenter } from '@core/application/presenters/internal-server-error.presenter'
import { RepositoryErrorPresenter } from '@core/application/presenters/repository-error.presenter'
import { CacheService } from '@core/application/services/cache.service'
import { localStorageAdapter } from '@core/infrastructure/localstorage/localstorage.adapter'
import constants from '@core/shared/constants'

const { STORAGES } = constants

export type TaskModel = Required<Omit<TaskRaw, 'owner'>> & {
    ownerId: string
}

class TaskRepository implements TaskRepositoryPort {
    private readonly storeName = STORAGES.tasks
    private readonly maxStoreSize = 10

    constructor(private readonly cacheSrv: CacheServicePort<TaskModel>) { }


    async deleteAllTasks(ownerId: string): Promise<void> {
        try {

            // Recuperar las tareas de terceros
            const thirdPartyTask =
                await this.cacheSrv.getAndFilterStoreByParams({
                    keyToFilter: 'ownerId', // buscar por nombre de la tarea
                    storeName: this.storeName, // buscar en el store de las tareas
                    valueToFilter: ownerId,
                    type: 0, // los resultados deben excluir el valor si lo encuentra
                })

            // Persistir los cambios se reescribe el store
            await this.cacheSrv.rewriteStoreByName(this.storeName, thirdPartyTask)

        } catch (error) {
            throw new RepositoryErrorPresenter(String(error), 'TaskRepository')
        }
    }

    async fetchByMatch(value: string, ownerId: string): Promise<TaskModel[]> {
        try {
            const result = await this.cacheSrv.getAndFilterStoreByParams({
                keyToFilter: 'ownerId', // buscar por nombre de la tarea
                storeName: this.storeName, // buscar en el store de las tareas
                valueToFilter: ownerId,
                type: 1, // los resultados deben incluir el valor si lo encuentra
            })

            /* Filtrar por expansion de terminos */
            return result.filter((t) => {
                const taskName = t.taskName.toString().toLowerCase()
                const taskDescription = t.taskDescription
                    .toString()
                    .toLowerCase()
                const searchTerms = value
                    .toLowerCase()
                    .split(' ')
                    .filter(Boolean)

                return searchTerms.every(
                    (term) =>
                        taskName.includes(term) ||
                        taskDescription.includes(term)
                )
            })
        } catch (error) {
            throw new RepositoryErrorPresenter(String(error), 'TaskRepository')
        }
    }

    async updateStatus(
        task: Required<Pick<TaskRaw, 'taskId' | 'status'>>,
        ownerId: string
    ): Promise<void> {
        try {
            // Consultar al Store por las tareas de un usuario
            let tasks = await this.cacheSrv.getAndFilterStoreByParams({
                keyToFilter: 'ownerId', // buscar por nombre de la tarea
                storeName: this.storeName, // buscar en el store de las tareas
                valueToFilter: ownerId,
                type: 1, // los resultados deben incluir el valor si lo encuentra
            })

            /** Empiezan validaciones */
            if (tasks.length === 0) {
                throw new Error(`No se encontraron tareas asociadas al usuario`)
            }

            tasks = tasks.map((t) => {
                if (t.taskId === task.taskId) {
                    return {
                        ...t,
                        status: task.status,
                    }
                } else return t
            })

            // Recuperar las tareas de terceros
            const thirdPartyTask =
                await this.cacheSrv.getAndFilterStoreByParams({
                    keyToFilter: 'ownerId', // buscar por nombre de la tarea
                    storeName: this.storeName, // buscar en el store de las tareas
                    valueToFilter: ownerId,
                    type: 0, // los resultados deben excluir el valor si lo encuentra
                })

            // Persistir los cambios se reescribe el store
            await this.cacheSrv.rewriteStoreByName(this.storeName, [
                ...thirdPartyTask,
                ...tasks,
            ])
        } catch (error) {
            throw new RepositoryErrorPresenter(String(error), 'TaskRepository')
        }
    }

    async deleteTask(taskId: string, ownerId: string): Promise<TaskModel[]> {
        try {
            // Consultar al Store por las tareas de un usuario
            const result = await this.cacheSrv.getAndFilterStoreByParams({
                keyToFilter: 'ownerId', // buscar por nombre de la tarea
                storeName: this.storeName, // buscar en el store de las tareas
                valueToFilter: ownerId,
                type: 1, // los resultados deben incluir el valor si lo encuentra
            })

            /** Empiezan validaciones */
            if (result.length === 0) {
                throw new Error(`No se encontraron tareas asociadas al usuario`)
            }

            // remover tarea
            const tasks = result.filter((task) => task.taskId !== taskId)

            // Recuperar las tareas de terceros
            const thirdPartyTask =
                await this.cacheSrv.getAndFilterStoreByParams({
                    keyToFilter: 'ownerId', // buscar por nombre de la tarea
                    storeName: this.storeName, // buscar en el store de las tareas
                    valueToFilter: ownerId,
                    type: 0, // los resultados deben excluir el valor si lo encuentra
                })

            // Persistir los cambios se reescribe el store
            await this.cacheSrv.rewriteStoreByName(this.storeName, [
                ...thirdPartyTask,
                ...tasks,
            ])

            return tasks
        } catch (error) {
            throw new RepositoryErrorPresenter(String(error), 'TaskRepository')
        }
    }

    async updateTask(
        data: Required<Omit<TaskRaw, 'owner' | 'status' | 'createdAt'>>,
        ownerId: string
    ): Promise<TaskModel> {
        try {
            // Consultar al Store por la tarea que se va a modificar
            const result = await this.cacheSrv.getAndFilterStoreByParams({
                keyToFilter: 'taskId', // buscar por nombre de la tarea
                storeName: this.storeName, // buscar en el store de las tareas
                valueToFilter: data.taskId,
                type: 1, // los resultados deben incluir el valor si lo encuentra
            })

            /** Empiezan validaciones */
            if (result.length === 0) {
                throw new Error(
                    `No se encontro una tarea que corresponda con el identificador: ${data.taskId}`
                )
            }

            if (result[0].ownerId !== ownerId) {
                throw new Error('No se puede modificar tareas de terceros')
            }

            // Mutar los atributos de la tarea seleccionada
            const updateTask: TaskModel = {
                ...result[0],
                ...data,
            }

            // Persistir los cambios
            await this.cacheSrv.updateStoreByName(
                {
                    keyToFilter: 'taskId',
                    storeName: this.storeName,
                    valueToFilter: updateTask.taskId,
                    type: 1,
                },
                {
                    ...updateTask,
                }
            )

            return updateTask
        } catch (error) {
            throw new RepositoryErrorPresenter(String(error), 'TaskRepository')
        }
    }

    async fetchAllByOwnerId(ownerId: string): Promise<TaskModel[]> {
        try {
            const result = await this.cacheSrv.getAndFilterStoreByParams({
                keyToFilter: 'ownerId', // buscar por nombre de la tarea
                storeName: this.storeName, // buscar en el store de las tareas
                valueToFilter: ownerId,
                type: 1, // los resultados deben incluir el valor si lo encuentra
            })

            return result
        } catch (error) {
            throw new RepositoryErrorPresenter(String(error), 'TaskRepository')
        }
    }

    async save(data: Required<TaskRaw>): Promise<void> {
        try {
            if (!data.owner || !data.owner.userId) {
                throw new RelationShipConstraintError(
                    'La tarea debe estar asociada a un usuario'
                )
            }

            // Recuperar lista actual de tareas
            const currentTaskFound =
                await this.cacheSrv.getAndFilterStoreByParams({
                    keyToFilter: 'ownerId', // buscar por nombre de la tarea
                    storeName: this.storeName, // buscar en el store de las tareas
                    valueToFilter: data.owner.userId,
                    type: 1,
                })

            // Verificar si se ha alcanzado el maximo de objetos de tipo Task
            if (this.maxStoreSize > currentTaskFound.length) {
                const result = await this.cacheSrv.getAndFilterStoreByParams({
                    keyToFilter: 'taskName', // buscar por nombre de la tarea
                    storeName: this.storeName, // buscar en el store de las tareas
                    valueToFilter: data.taskName,
                    type: 1, // los resultados deben incluir el valor si lo encuentra
                })

                if (result.length > 0) {
                    throw new UniqueConstraintError(
                        'No pueden haber dos tareas registradas con el mismo nombre'
                    )
                }

                await this.cacheSrv.updateStoreByName(
                    {
                        storeName: this.storeName,
                        keyToFilter: 'taskId',
                        valueToFilter: data.taskId,
                    },
                    {
                        taskId: data.taskId,
                        taskName: data.taskName,
                        taskDescription: data.taskDescription,
                        status: data.status,
                        createdAt: data.createdAt,
                        ownerId: data.owner.userId,
                    }
                )
            } else {
                throw new MaximumStoreSizeError(
                    'Se ha alcanzado la cuota maxima de tareas de usuario permitida'
                )
            }
        } catch (error) {
            if (
                error instanceof UniqueConstraintError ||
                error instanceof MaximumStoreSizeError
            ) {
                throw new ConflictErrorPresenter(error.message)
            }

            if (error instanceof RelationShipConstraintError) {
                throw new InternalServerErrorPresenter(String(error))
            }

            throw new RepositoryErrorPresenter(String(error), 'TaskRepository')
        }
    }
}

export const taskRepositoryImpl = new TaskRepository(
    new CacheService<TaskModel>(localStorageAdapter)
)
