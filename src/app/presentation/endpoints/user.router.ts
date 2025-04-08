import {
    createTaskSchema,
    removeTaskSchema,
    updateTaskSchema,
    updateTaskStatusSchema,
} from '@app/application/schemas/task.schemas'
import { createTaskFactory } from '@app/factories/task/create.factory'
import { getUserTaskByMatchFactory } from '@app/factories/task/get-by-match.factory'
import { listTaskByUserFactory } from '@app/factories/task/list-by-user.factory'
import { removeTaskUserFactory } from '@app/factories/task/remove-user-task.factory'
import { toggleUserTaskStatusFactory } from '@app/factories/task/toggle-status.factory'
import { updateUserTaskFactory } from '@app/factories/task/update-user-task.factory'
import { taskRequestLimit } from '@app/infrastructure/repositories/http/rate-limit'
import { authMiddlewareFactory } from '@core/factories/auth-middleware.factory'
import { validatorSchemaFactory } from '@core/factories/validator-schema'
import { expressMiddlewareAdapter } from '@core/infrastructure/express/express-middleware-adapter'
import { expressRouteAdapter } from '@core/infrastructure/express/express-route-adapter'
import { Router } from 'express'

export const userRouter = Router()

/** Limitador de peticiones para las tareas de usuario */
userRouter.use(taskRequestLimit)

/**
 * El orden de los middlewares puede afectar el comportamiento esperado del servicio
 * Si es una ruta protegida primeramente debe agregar el middleware de autenticacion
 * y posterior los demas middlewares necesarios.
 */
userRouter.post(
    '/:userId/tasks',
    expressMiddlewareAdapter(authMiddlewareFactory),
    expressMiddlewareAdapter(validatorSchemaFactory(createTaskSchema)),
    expressRouteAdapter(createTaskFactory)
)

userRouter.get(
    '/:userId/tasks',
    expressMiddlewareAdapter(authMiddlewareFactory),
    expressRouteAdapter(listTaskByUserFactory)
)

userRouter.put(
    '/:userId/tasks',
    expressMiddlewareAdapter(authMiddlewareFactory),
    expressMiddlewareAdapter(validatorSchemaFactory(updateTaskSchema)),
    expressRouteAdapter(updateUserTaskFactory)
)

userRouter.patch(
    '/:userId/tasks',
    expressMiddlewareAdapter(authMiddlewareFactory),
    expressMiddlewareAdapter(validatorSchemaFactory(updateTaskStatusSchema)),
    expressRouteAdapter(toggleUserTaskStatusFactory)
)

userRouter.delete(
    '/:userId/tasks/:taskId',
    expressMiddlewareAdapter(authMiddlewareFactory),
    expressMiddlewareAdapter(validatorSchemaFactory(removeTaskSchema)),
    expressRouteAdapter(removeTaskUserFactory)
)

userRouter.get(
    '/:userId/tasks/match',
    expressRouteAdapter(getUserTaskByMatchFactory)
)
