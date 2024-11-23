import { prisma } from "../lib/db";
import { LoginUserRequest, RegisterUserRequest } from "../model/user-model";

export class UserRepository {

    static async countUserEmail(data: RegisterUserRequest){
        return await prisma.user.count({
            where: {
                email: data.email
            }
        })
    }
    static async createUser(data: RegisterUserRequest){
        return await prisma.user.create({
            data
        })
    }

    static async findEmailById(data: LoginUserRequest){
        return await prisma.user.findUnique({
            where: {
                email: data.email
            }
        })
    }
}