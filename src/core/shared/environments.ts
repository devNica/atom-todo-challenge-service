import 'dotenv/config'

export const {
    NODE_ENV,
    SERVER_PORT,

    JWT_SECRET_SESSION = 'b2xpdm9zIGRlIERpb3M',
    JWT_ACCESS_EXPIRATION_TIME = 600,

    COOKIES_SECRET,
    CSRF_SECRET,
} = process.env
