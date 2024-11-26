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
            data: {
                email: data.email,
                password: data.password,
                userProfile: {  
                    create: {
                        name: data.name,
                        height: data.height,
                        weight: data.weight,
                        age: data.age
                    }
                }
            },
            include: {
                userProfile: true
            }
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
                password: data.password
            }
        })
    }
}