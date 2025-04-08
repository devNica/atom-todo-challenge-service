import Joi from 'joi'

export const removeUserSchema: Joi.ObjectSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'any.required': 'La direccion de correo del usuario es requerido',
        'string.email': 'El formato del correo es incorrecto',
        'string.empty': 'La direccion de correo del usuario es requerido',
        'string.base': 'El formato del correo es incorrecto',
    }),
})
