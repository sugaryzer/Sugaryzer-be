import { User } from "@prisma/client";

export type UserResponse = {
    id: string;
    email: string
    access_token?: string;
}

export type RegisterUserRequest = {
    email: string;
    password: string;
    name: string;
    height: number;
    weight: number;
    age: number;
}

export type LoginUserRequest = {
    email: string;
    password: string;
}

export type UpdateUserRequest = {
    password?: string;
}

export function transformUserResponse(user: User): UserResponse{
    return {
        id: user.id,
        email: user.email
    }
}