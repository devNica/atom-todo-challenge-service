import * as EnvConfig from './environments'

export default {
    ...EnvConfig,

    SERVER_PORT: Number(EnvConfig.SERVER_PORT),

    NODE_ENV: EnvConfig.NODE_ENV ?? 'development',

    PREFIX: 'atom/v1',

    STORAGES: {
        auth: 'users',
        tasks: 'tasks',
    },
}
