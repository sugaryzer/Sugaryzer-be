import { prismaClient } from "../lib/db";
import { LoginUserRequest, RegisterUserRequest } from "../model/user-model";

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
}