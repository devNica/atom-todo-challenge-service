export interface CreateUserDTO {
    email: string
}

export interface UserLoginDTO {
    email: string
}

export interface UserLoggedDTO {
    userId: string
    email: string
    token: string
}

export interface CreateUserPort {
    run: (data: CreateUserDTO) => Promise<UserLoggedDTO>
}

export interface UserLoginPort {
    run: (data: UserLoginDTO) => Promise<UserLoggedDTO>
}
