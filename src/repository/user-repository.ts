import { prisma } from "../lib/db";
import { RegisterUserRequest } from "../model/user-model";

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
}