import { User } from "@prisma/client";
import { prismaClient } from "../lib/db";
import { LoginUserRequest, RegisterUserRequest, UpdateUserRequest } from "../model/user-model";

export class UserRepository {

    static async countUserEmail(data: RegisterUserRequest){
        return await prismaClient.user.count({
            where: {
                email: data.email
            }
        })
    }
    static async createUser(data: RegisterUserRequest){
        return await prismaClient.user.create({
            data
        })
    }

    static async findEmailById(data: LoginUserRequest){
        return await prismaClient.user.findUnique({
            where: {
                email: data.email
            }
        })
    }

    static async updateCurrentUser(user: User, data: UpdateUserRequest){
        return await prismaClient.user.update({
            where: {
                email: user.email
            },
            data: {
                name: data.name,
                password: data.password,
                image: data.image
            }
        })
    }

    static async findUserById(id: string){
        return await prismaClient.user.findUnique({
            where: {
                id
            }
        })
    }
}