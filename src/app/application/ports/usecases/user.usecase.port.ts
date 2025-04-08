
export interface RegisteredUserDTO {
    email: string
    createdAt: string
}


export interface ListRegisteredUserPort {
    run: () => Promise<RegisteredUserDTO[]>
}

export interface RemoveUserPort {
    run: (email: string) => Promise<RegisteredUserDTO[]>
}