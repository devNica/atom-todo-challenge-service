export function getObjetcKeyPath(obj: any, searchKey: string): string {
    if (typeof obj !== 'object' || obj === null) {
        return ''
    }

    const keys = Object.keys(obj)
    const values: string[] = []

    if (searchKey in obj) {
        values.push(obj[searchKey])
    }

    keys.forEach((key) => {
        const nestedValue = getObjetcKeyPath(obj[key], searchKey)
        if (nestedValue) {
            values.push(nestedValue)
        }
    })

    return values.join('|')
}

export const unwrapData = (data: any): any => {
    const r = JSON.stringify(data, null, 2)
    return JSON.parse(r)
}
