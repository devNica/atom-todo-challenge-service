/* eslint-disable @typescript-eslint/no-useless-constructor */
export class UniqueConstraintError extends Error {
    constructor(message: string) {
        super(message)
    }
}

export class MaximumStoreSizeError extends Error {
    constructor(message: string) {
        super(message)
    }
}

export class RelationShipConstraintError extends Error {
    constructor(message: string) {
        super(message)
    }
}
