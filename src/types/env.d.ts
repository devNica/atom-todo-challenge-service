declare global {
    namespace NodeJS {
        interface ProcessEnv {
            SERVER_PORT: string
            NODE_ENV: 'development' | 'test' | 'production'

            JWT_SECRET_SESSION: string
            JWT_REFRESH_SESSION: string
            JWT_PASSWORD_RECOVERY: string
            JWT_ACCOUNT_RECOVERY: string
            JWT_ACCESS_EXPIRATION_TIME: string
            JWT_REFRESH_REFRESH_EXPIRATION_TIME: string

            COOKIES_SECRET: string

            CSRF_SECRET: string
        }
    }
}

export {}
