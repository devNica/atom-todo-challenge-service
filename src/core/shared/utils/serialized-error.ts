import { type JoiErrorDetailsModel } from '@core/application/models/validators/joi'

export const serializedErrorStack = (stack: JoiErrorDetailsModel[]): string => {
    return stack
        .map((e) => {
            if (e.type === 'object.unknown') {
                return `El campo: ${e.context.key} no es reconocido`.trim()
            }
            return e.message.trim()
        })
        .join(',')
}

export const createDelay = async (ms: number): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, ms))
}
