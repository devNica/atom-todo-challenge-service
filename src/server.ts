import { ExpressServerAdapter } from '@core/infrastructure/express/express-server-adapter'
import { WinstonLoggerAdapter } from '@core/shared/winston/winston.adapter'
import constants from '@core/shared/constants'
import { localStorageAdapter } from '@core/infrastructure/localstorage/localstorage.adapter'

const { PREFIX, SERVER_PORT, STORAGES } = constants

async function startAuthService(): Promise<void> {
    // Crear LocalStorages Para persistir los datos
    localStorageAdapter.createStore(STORAGES.auth)
    localStorageAdapter.createStore(STORAGES.tasks)

    const logger = WinstonLoggerAdapter.init()

    const srv = new ExpressServerAdapter(SERVER_PORT, PREFIX, logger)

    await srv.start()
}

/* eslint-disable @typescript-eslint/no-floating-promises */
startAuthService()
