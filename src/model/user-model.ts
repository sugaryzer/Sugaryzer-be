import { User } from "@prisma/client";

export type UserResponse = {
    name: string;
    email: string;
    image?: string;
    access_token?: string;
}

export type RegisterUserRequest = {
    name: string;
    email: string;
    password: string;
}

export type LoginUserRequest = {
    email: string;
    password: string;
}

export function transformUserResponse(user: User): UserResponse{
    return {
        name: user.name,
        email: user.email
    }
}