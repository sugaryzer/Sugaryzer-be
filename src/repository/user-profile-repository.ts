import { User } from "@prisma/client";
import { prismaClient } from "../lib/db";
import { UpdateUserProfileRequest } from "../model/user-profile-model";

export class UserProfileRepository {

    static async findUserProfileById(data: User){
        return await prismaClient.userProfile.findUnique({
            where: {
                userId: data.id
            }
        })
    }

    static async updateUserProfile(data: UpdateUserProfileRequest){
        return await prismaClient.userProfile.update({
            where: {
                userId: data.userId
            },
            data : {
                name: data.name,
                image: data.image,
                height: data.height,
                weight: data.weight,
                age: data.age
            }
        })
    }
}