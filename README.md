# atom-todo-challenge-service

# 📚 Características

    ✅ API RESTFULL (GET, POST, PUT, PATCH & DELETE)
    🔑 Generacion de Token de Sesion (Con Expiracion)
    🔐 Autenticacion en Rutas Protegidas por Middleware
    🔥 Verificacion de Carga Util de las Peticiones (JoiSchemas)
    🛑 Limitador de  Rate de Peticiones
    🍞 Persistencia Local de Datos
    📑 Logs de ejecucion con Winston
    🏗️ Estructurado por Arq Hexagonal + DDD

    🦸 Cantidad Maxima de Usuarios Registrados Permitido: 15
    📑 Cantidad Maxima de Tareas por Usuario: 10


# 🚀 Instalacion y Uso

## 1. Descargar el Repositorio

## `github.com/devnica/atom-todo-challenge-service`

## 2. Instalar Depedencias

## `npm run install -E`

## 3. Ejecutar en Modo Desarrollo

## `npm run dev`

`` 
    El servicio corre por defecto en el puerto 9000,
    Si desea ejecutarlo en otro puerto agregue un archivo 
    de variables de entorno y  defina SERVER_PORT y su 
    valor  
``

## 4. Aplicar configuraciones de Eslint y Prettier

## `npm run lint:fix`

## 5. Compilar de Typescript a Javascript

## `npm run build`

## 6. Ejecutar en Modo Producion

## `npm start`

# 📌 Documentacion API

### Request

```http
POST /atom/v1/auth/register

Códigos de estado:

201 Created: Recurso creado exitosamente.
400 Bad Request: Error en los parametros.
409 Conflict: Errores de Restriccion.
```

| Parameter | Type     | Required | Description                      |
| :-------- | :------- | :------- | :------------------------------- |
| `email`   | `string` | **true** | `Email para registro de usuario` |

### Response

    HTTP/1.1 201 OK
    Content-Language: en
    Status: 201 OK
    Connection: keep-alive
    Keep-Alive: timeout-5
    Content-Type: application/json

    {
        "message": 'Registro de usuario exitoso!',
        "meta": {
            "userId": "1eb23e07-e8cd-4df6-a7f5-e43ad3383898",
            "email: "user@test.com",
            "token": "eyJhbGciOiJI..."
        }
    }

### Request

```http
POST /atom/v1/auth/login

200 Success: Peticion realizada exitosamente.
400 Bad Request: Error en los parametros.
409 Conflict: Errores de Restriccion.
```

| Parameter | Type     | Required | Description                   |
| :-------- | :------- | :------- | :---------------------------- |
| `email`   | `string` | **true** | `Email para inicio de sesion` |

### Response

    HTTP/1.1 200 OK
    Content-Language: en
    Status: 200 OK
    Connection: keep-alive
    Keep-Alive: timeout-5
    Content-Type: application/json

    {
        "message": 'Inicio de sesion de usuario exitoso!',
        "meta": {
            "userId": "1eb23e07-e8cd-4df6-a7f5-e43ad3383898",
            "email: "user@test.com",
            "token": "eyJhbGciOiJI..."
        }
    }

### Request

```http
POST /atom/v1/users/:userId/tasks
Authorization: Bearer e8by...

Códigos de estado:

201 Created: Recurso creado exitosamente.
400 Bad Request: Error en los parametros.
401 Unauthorized: Autenticación fallida token no encontrado.
403 Forbidden: Autenticación fallida token inválido.
```

| Parameter         | Type     | Required | Description                           |
| :---------------- | :------- | :------- | :------------------------------------ |
| `userId`          | `string` | **true** | `Identificador del Usuario`           |
| `taskName`        | `string` | **true** | `Nombre de la tarea a registrar`      |
| `taskDescription` | `string` | **true** | `Descripcion de la tarea a registrar` |

### Response

    HTTP/1.1 201 OK
    Content-Language: en
    Status: 201 OK
    Connection: keep-alive
    Keep-Alive: timeout-5
    Content-Type: application/json

    {
        "message": 'Registro de tarea exitoso!',
        "meta": {
            "taskId": "1c908b49-0fab-4e16-8d10-9eb23d35cf15",
            "taskName": "Tarea de Prueba",
            "taskDescription": "Esta es la tarea de prueba a registrar",
            "createdAt": 1744065427171,
            "status": true
        }
    }

### Request

```http
GET /atom/v1/users/:userId/tasks
Authorization: Bearer e8by...

Códigos de estado:

200 Success: Peticion realizada con exito.
400 Bad Request: Error en los parametros.
401 Unauthorized: Autenticación fallida token no encontrado.
403 Forbidden: Autenticación fallida token inválido.
```

| Parameter | Type     | Required | Description                                                   |
| :-------- | :------- | :------- | :------------------------------------------------------------ |
| `userId`  | `string` | **true** | `Identificador del Usuario requerido para filtrar las tareas` |

### Response

    HTTP/1.1 200 OK
    Content-Language: en
    Status: 200 OK
    Connection: keep-alive
    Keep-Alive: timeout-5
    Content-Type: application/json

    {
        "message": 'Lista de tareas recuperada exitosamente!',
        "meta": [
            {
                "taskId": "1c908b49-0fab-4e16-8d10-9eb23d35cf15",
                "taskName": "Tarea de Prueba",
                "taskDescription": "Esta es la tarea de prueba a registrar",
                "createdAt": 1744065427171,
                "status": true
            }
        ]
    }

### Request

```http
PUT /atom/v1/users/:userId/tasks
Authorization: Bearer e8by...

Códigos de estado:

200 Success: Actualizacion realizada con exito.
400 Bad Request: Error en los parametros.
401 Unauthorized: Autenticación fallida token no encontrado.
403 Forbidden: Autenticación fallida token inválido.
```

| Parameter         | Type     | Required | Description                                                   |
| :---------------- | :------- | :------- | :------------------------------------------------------------ |
| `userId`          | `string` | **true** | `Identificador del Usuario requerido para filtrar las tareas` |
| `taskId`          | `string` | **true** | `Identificador de la tarea a actualizar`                      |
| `taskName`        | `string` | **true** | `Nombre de la tarea a registrar`                              |
| `taskDescription` | `string` | **true** | `Descripcion de la tarea a registrar`                         |

### Response

    HTTP/1.1 200 OK
    Content-Language: en
    Status: 200 OK
    Connection: keep-alive
    Keep-Alive: timeout-5
    Content-Type: application/json

    {
        "message": 'Tarea actualizada exitosamente!',
        "meta": {
            "taskId": "1c908b49-0fab-4e16-8d10-9eb23d35cf15",
            "taskName": "Tarea de Prueba Modificada",
            "taskDescription": "Se modifico la tarea",
            "createdAt": 1744065427171,
            "status": true
        }

    }

### Request

```http
PATCH /atom/v1/users/:userId/tasks
Authorization: Bearer e8by...

Códigos de estado:

200 Success: Actualizacion parcial realizada con exito.
400 Bad Request: Error en los parametros.
401 Unauthorized: Autenticación fallida token no encontrado.
403 Forbidden: Autenticación fallida token inválido.
```

| Parameter | Type      | Required | Description                                                   |
| :-------- | :-------- | :------- | :------------------------------------------------------------ |
| `userId`  | `string`  | **true** | `Identificador del Usuario requerido para filtrar las tareas` |
| `taskId`  | `string`  | **true** | `Identificador de la tarea a actualizar`                      |
| `status`  | `boolean` | **true** | `Nuevo estado de la tarea`                                    |

### Response

    HTTP/1.1 200 OK
    Content-Language: en
    Status: 200 OK
    Connection: keep-alive
    Keep-Alive: timeout-5
    Content-Type: application/json

    {
        "message": 'Estado de la tarea actualizado exitosamente!',
        "meta": {
            "taskId": "1c908b49-0fab-4e16-8d10-9eb23d35cf15",
            "taskName": "Tarea de Prueba",
            "taskDescription": "Se modifico status de la tarea",
            "createdAt": 1744065427171,
            "status": false
        }

    }

### Request

```http
DELETE /atom/v1/users/:userId/tasks/:taskId
Authorization: Bearer e8by...

Códigos de estado:

200 Success: Eliminacion realizada con exito.
400 Bad Request: Error en los parametros.
401 Unauthorized: Autenticación fallida token no encontrado.
403 Forbidden: Autenticación fallida token inválido.
```

| Parameter | Type     | Required | Description                                                   |
| :-------- | :------- | :------- | :------------------------------------------------------------ |
| `userId`  | `string` | **true** | `Identificador del Usuario requerido para filtrar las tareas` |
| `taskId`  | `string` | **true** | `Identificador de la tarea a eliminar`                        |

#### `Nota: Se retorna la lista de tareas resultantes despues de la eliminacion`

### Response

    HTTP/1.1 200 OK
    Content-Language: en
    Status: 200 OK
    Connection: keep-alive
    Keep-Alive: timeout-5
    Content-Type: application/json

    {
        "message": 'la tarea se elimino exitosamente!',
        "meta": [
            {
                "taskId": "1c908b49-0fab-4e16-8d10-9eb23d35cf34",
                "taskName": "Tarea 2",
                "taskDescription": "Esta es la tarea 2",
                "createdAt": 1744065427173,
                "status": false
            },
            {
                "taskId": "1c908b49-0fab-4e16-8d10-9eb23d35cf56",
                "taskName": "Tarea 3",
                "taskDescription": "Esta es la tarea 3",
                "createdAt": 1744065427179,
                "status": true
            }
        ]

    }

## `Bonus: Filtrar tarea por extension de  parametros`

### Request

```http
GET /atom/v1/users/:userId/tasks/match
Authorization: Bearer e8by...

Códigos de estado:

200 Success: Peticion realizada con exito.
400 Bad Request: Error en los parametros.
401 Unauthorized: Autenticación fallida token no encontrado.
403 Forbidden: Autenticación fallida token inválido.
```

| Parameter | Type     | Required | Description                                                   |
| :-------- | :------- | :------- | :------------------------------------------------------------ |
| `userId`  | `string` | **true** | `Identificador del Usuario requerido para filtrar las tareas` |
| `value`   | `string` | **true** | `Parametro de Consulta`                                       |

#### `Nota: Se retorna la lista de tareas que coincidan parcial o totalmente con el valor de comparacion`

### Response

    HTTP/1.1 200 OK
    Content-Language: en
    Status: 200 OK
    Connection: keep-alive
    Keep-Alive: timeout-5
    Content-Type: application/json

    {
        "message": 'registros recuperados existosamente!',
        "meta": [
            {
                "taskId": "1c908b49-0fab-4e16-8d10-9eb23d35cf34",
                "taskName": "Tarea 2",
                "taskDescription": "Esta es la tarea 2",
                "createdAt": 1744065427173,
                "status": false
            },
            {
                "taskId": "1c908b49-0fab-4e16-8d10-9eb23d35cf56",
                "taskName": "Tarea 3",
                "taskDescription": "Esta es la tarea 3",
                "createdAt": 1744065427179,
                "status": true
            }
        ]

    }


## Endpoints de Mantenimiento

### Request

```http
GET /atom/v1/users/all

Códigos de estado:

200 Success: Peticion realizada con exito.
```

#### `Nota: Se retorna la lista de los usuarios registrados`

### Response

    HTTP/1.1 200 OK
    Content-Language: en
    Status: 200 OK
    Connection: keep-alive
    Keep-Alive: timeout-5
    Content-Type: application/json

    {
        "message": 'registros recuperados existosamente!',
        "meta": [
            {
                "email": "user@atom.com",
                "createdAt": "07/04/2025",
            },
            {
                "email": "admin@atom.com",
                "createdAt": "07/04/2025",
            },
        ]

    }


### Request

```http
DELETE /atom/v1/users/purge

Códigos de estado:

200 Success: Eliminacion realizada con exito.
```
| Parameter | Type     | Required | Description                                                   |
| :-------- | :------- | :------- | :------------------------------------------------------------ |
| `email`  | `string` | **true** | `Direccion de correo del usuario a purgar` |
                                  
#### `Nota: Se retorna la lista de los usuarios despues de la purga, tambien se purgan las tareas del usuario`

### Response

    HTTP/1.1 200 OK
    Content-Language: en
    Status: 200 OK
    Connection: keep-alive
    Keep-Alive: timeout-5
    Content-Type: application/json

    {
        "message": 'registros recuperados existosamente!',
        "meta": [
            {
                "email": "user@atom.com",
                "createdAt": "07/04/2025",
            },
            {
                "email": "admin@atom.com",
                "createdAt": "07/04/2025",
            },
        ]

    }

# 📂 Estructura del Proyecto

        ├── .env
        ├── .eslintignore
        ├── .eslintrc
        ├── .gitignore
        ├── .prettierignore
        ├── .prettierrc
        ├── LICENSE
        ├── package-lock.json
        ├── package.json
        ├── README.md
        ├── src/
        |   ├── app/
        |   |   ├── application/
        |   |   |   ├── controllers/
        |   |   |   |   ├── auth/
        |   |   |   |   |   ├── create.controller.ts
        |   |   |   |   |   ├── login.controller.ts
        |   |   |   |   ├── task/
        |   |   |   |   |   ├── create.controller.ts
        |   |   |   |   |   ├── get-by-match.controller.ts
        |   |   |   |   |   ├── list-by-user.controller.ts
        |   |   |   |   |   ├── remove-user-task.controller.ts
        |   |   |   |   |   ├── toggle-status.controller.ts
        |   |   |   |   |   ├── update-user-task.controller.ts
        |   |   |   |   ├── users/
        |   |   |   |   |   ├── delete.controller.ts
        |   |   |   |   |   ├── list.controller.ts
        |   |   |   ├── ports/
        |   |   |   |   ├── repositories/
        |   |   |   |   |   ├── task.repository.port.ts
        |   |   |   |   |   ├── user.repository.port.ts
        |   |   |   |   ├── usecases/
        |   |   |   |   |   ├── auth.usecase.port.ts
        |   |   |   |   |   ├── task.usecase.port.ts
        |   |   |   |   |   ├── user.usecase.port.ts
        |   |   |   ├── schemas/
        |   |   |   |   ├── auth.schemas.ts
        |   |   |   |   ├── task.schemas.ts
        |   |   |   |   ├── user.schamas.ts
        |   |   |   ├── usecases/
        |   |   |   |   ├── task/
        |   |   |   |   |   ├── create.usecase.ts
        |   |   |   |   |   ├── get-by-match.usecase.ts
        |   |   |   |   |   ├── list-by-user.usecase.ts
        |   |   |   |   |   ├── remove-user-task.usecase.ts
        |   |   |   |   |   ├── toggle-status.usecase.ts
        |   |   |   |   |   ├── update-user-task.usecase.ts
        |   |   |   |   ├── users/
        |   |   |   |   |   ├── create.usecase.ts
        |   |   |   |   |   ├── delete.usecase.ts
        |   |   |   |   |   ├── list.usecase.ts
        |   |   |   |   |   ├── login.usecase.ts
        |   |   ├── domain/
        |   |   |   ├── entities/
        |   |   |   |   ├── task.entity.ts
        |   |   |   |   ├── user.entity.ts
        |   |   |   ├── value-objects/
        |   |   ├── factories/
        |   |   |   ├── task/
        |   |   |   |   ├── create.factory.ts
        |   |   |   |   ├── get-by-match.factory.ts
        |   |   |   |   ├── list-by-user.factory.ts
        |   |   |   |   ├── remove-user-task.factory.ts
        |   |   |   |   ├── toggle-status.factory.ts
        |   |   |   |   ├── update-user-task.factory.ts
        |   |   |   ├── users/
        |   |   |   |   ├── create.factory.ts
        |   |   |   |   ├── delete.factory.ts
        |   |   |   |   ├── list.factory.ts
        |   |   |   |   ├── login.factory.ts
        |   |   ├── infrastructure/
        |   |   |   ├── repositories/
        |   |   |   |   ├── http/
        |   |   |   |   |   ├── rate-limit.ts
        |   |   |   |   ├── task.repository.ts
        |   |   |   |   ├── user.repository.ts
        |   |   ├── presentation/
        |   |   |   ├── endpoints/
        |   |   |   |   ├── auth.router.ts
        |   |   |   |   ├── user.router.ts
        |   ├── core/
        |   |   ├── application/
        |   |   |   ├── middlewares/
        |   |   |   |   ├── is-auth.middleware.ts
        |   |   |   ├── models/
        |   |   |   |   ├── app/
        |   |   |   |   |   ├── app.model.ts
        |   |   |   |   ├── files/
        |   |   |   |   |   ├── file.model.ts
        |   |   |   |   ├── http/
        |   |   |   |   |   ├── http.ts
        |   |   |   |   ├── middlewares/
        |   |   |   |   |   ├── http-request.ts
        |   |   |   |   ├── token/
        |   |   |   |   |   ├── token.ts
        |   |   |   |   ├── validators/
        |   |   |   |   |   ├── errors.ts
        |   |   |   |   |   ├── joi.ts
        |   |   |   ├── ports/
        |   |   |   |   ├── cache.port.ts
        |   |   |   |   ├── controller.port.ts
        |   |   |   |   ├── error-handler.port.ts
        |   |   |   |   ├── joi-validation.port.ts
        |   |   |   |   ├── logger.port.ts
        |   |   |   |   ├── middleware.port.ts
        |   |   |   |   ├── presenter.port.ts
        |   |   |   |   ├── token-handler.port.ts
        |   |   |   ├── presenters/
        |   |   |   |   ├── app-error.ts
        |   |   |   |   ├── conflict-error-presenter.ts
        |   |   |   |   ├── forbidden-req-error.presenter.ts
        |   |   |   |   ├── internal-server-error.presenter.ts
        |   |   |   |   ├── repository-error.presenter.ts
        |   |   |   |   ├── request-validation.presenter.ts
        |   |   |   |   ├── success-request.presenter.ts
        |   |   |   |   ├── successfully-created-resource.presenter.ts
        |   |   |   |   ├── unauthorized-req-error.presenter.ts
        |   |   |   ├── services/
        |   |   |   |   ├── cache.service.ts
        |   |   |   |   ├── joi-validation.service.ts
        |   |   ├── domain/
        |   |   |   ├── entities/
        |   |   |   |   ├── base.entity.ts
        |   |   |   ├── value-objects/
        |   |   |   |   ├── unique-identificator.vo.ts
        |   |   ├── factories/
        |   |   |   ├── auth-middleware.factory.ts
        |   |   |   ├── validator-schema.ts
        |   |   ├── infrastructure/
        |   |   |   ├── express/
        |   |   |   |   ├── config/
        |   |   |   |   |   ├── express-global-middleware.ts
        |   |   |   |   |   ├── express-handle-error.ts
        |   |   |   |   |   ├── express-handle-routes.ts
        |   |   |   |   |   ├── express-setup-security.ts
        |   |   |   |   ├── express-error-adapter.ts
        |   |   |   |   ├── express-middleware-adapter.ts
        |   |   |   |   ├── express-route-adapter.ts
        |   |   |   |   ├── express-server-adapter.ts
        |   |   |   ├── jwt/
        |   |   |   |   ├── token-security-adapter.ts
        |   |   |   ├── localstorage/
        |   |   |   |   ├── localstorage.adapter.ts
        |   |   ├── presentation/
        |   |   |   ├── models/
        |   |   |   |   ├── api/
        |   |   |   |   |   ├── endpoint.model.ts
        |   |   ├── shared/
        |   |   |   ├── constants.ts
        |   |   |   ├── environments.ts
        |   |   |   ├── utils/
        |   |   |   |   ├── date.ts
        |   |   |   |   ├── object.utils.ts
        |   |   |   |   ├── serialized-error.ts
        |   |   |   |   ├── server.util.ts
        |   |   |   |   ├── validator.ts
        |   |   |   ├── winston/
        |   |   |   |   ├── config/
        |   |   |   |   |   ├── winston-logger.config.ts
        |   |   |   |   ├── winston.adapter.ts
        |   ├── server.ts
        |   ├── types/
        |   |   ├── env.d.ts
        |   |   ├── express.d.ts
        ├── tsconfig.json