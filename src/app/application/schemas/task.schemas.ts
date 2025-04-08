import Joi from 'joi'

export const createTaskSchema: Joi.ObjectSchema = Joi.object({
    userId: Joi.string().uuid().required().messages({
        'any.required': 'El Id del usuario es requerido',
        'string.empty': 'El Id del usuario es requerido',
        'string.guid': 'El formato del Id del usuario es incorrecto',
    }),
    taskName: Joi.string().min(5).max(50).required().messages({
        'any.required': 'El nombre de la tarea es requerido',
        'string.empty': 'El nombre de la tarea es requerido',
        'string.base': 'Formato de entrada incorrecto',
        'string.max':
            'El nombre de la tarea no puede exceder los 50 caracteres',
        'string.min':
            'El nombre de la tarea no puede ser menor de 5 caracteres',
    }),
    taskDescription: Joi.string().min(5).max(100).required().messages({
        'any.required': 'La descripcion de la tarea es requerido',
        'string.empty': 'La descripcion de la tarea es requerido',
        'string.base': 'Formato de entrada incorrecto',
        'string.max':
            'La descripcion de la tarea no puede exceder los 100 caracteres',
        'string.min':
            'La descripcion de la tarea no puede ser menor de 5 caracteres',
    }),
})

export const updateTaskSchema: Joi.ObjectSchema = Joi.object({
    userId: Joi.string().uuid().required().messages({
        'any.required': 'El Id del usuario es requerido',
        'string.empty': 'El Id del usuario es requerido',
        'string.guid': 'El formato del Id del usuario es incorrecto',
    }),
    taskId: Joi.string().uuid().required().messages({
        'any.required': 'El Id de la tarea es requerido',
        'string.empty': 'El Id de la tarea es requerido',
        'string.guid': 'El formato del Id de la tarea es incorrecto',
    }),
    taskName: Joi.string().min(5).max(50).required().messages({
        'any.required': 'El nombre de la tarea es requerido',
        'string.empty': 'El nombre de la tarea es requerido',
        'string.base': 'Formato de entrada incorrecto',
        'string.max':
            'El nombre de la tarea no puede exceder los 50 caracteres',
        'string.min':
            'El nombre de la tarea no puede ser menor de 5 caracteres',
    }),
    taskDescription: Joi.string().min(5).max(100).required().messages({
        'any.required': 'La descripcion de la tarea es requerido',
        'string.empty': 'La descripcion de la tarea es requerido',
        'string.base': 'Formato de entrada incorrecto',
        'string.max':
            'La descripcion de la tarea no puede exceder los 100 caracteres',
        'string.min':
            'La descripcion de la tarea no puede ser menor de 5 caracteres',
    }),
})

export const updateTaskStatusSchema: Joi.ObjectSchema = Joi.object({
    userId: Joi.string().uuid().required().messages({
        'any.required': 'El Id del usuario es requerido',
        'string.empty': 'El Id del usuario es requerido',
        'string.guid': 'El formato del Id del usuario es incorrecto',
    }),
    taskId: Joi.string().uuid().required().messages({
        'any.required': 'El Id de la tarea es requerido',
        'string.empty': 'El Id de la tarea es requerido',
        'string.guid': 'El formato del Id de la tarea es incorrecto',
    }),
    status: Joi.boolean().required().messages({
        'any.required': 'El estado de la tarea es requerido',
        'booelan.empty': 'El estado de la tarea es requerido',
        'boolean.base': 'Formato incorrecto del estado de la tarea',
    }),
})

export const removeTaskSchema: Joi.ObjectSchema = Joi.object({
    userId: Joi.string().uuid().required().messages({
        'any.required': 'El Id del usuario es requerido',
        'string.empty': 'El Id del usuario es requerido',
        'string.guid': 'El formato del Id del usuario es incorrecto',
    }),
    taskId: Joi.string().uuid().required().messages({
        'any.required': 'El Id de la tarea es requerido',
        'string.empty': 'El Id de la tarea es requerido',
        'string.guid': 'El formato del Id de la tarea es incorrecto',
    }),
})
