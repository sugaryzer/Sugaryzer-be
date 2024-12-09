import { User } from "@prisma/client";
import { transformUserProfileResponse, UpdateUserProfileRequest, UserProfileResponse } from "../model/user-profile-model";
import { UserProfileValidation } from "../validation/user-profile-validation";
import { Validation } from "../validation/validation";
import { UserProfileRepository } from "../repository/user-profile-repository";
import { ResponseError } from "../error/response-error";
import { storeFileToBucket } from "../lib/cloud-storage";
import { UserRequest } from "../type/user-request";

export class UserProfileService {

    static async get(user: User): Promise<UserProfileResponse> {
        const userProfile = await UserProfileRepository.findUserProfileById(user)
        if(!userProfile){
            throw new ResponseError(404, 'User not found')
        }

        return transformUserProfileResponse(userProfile)
    }

    static async update(user: User, request: UpdateUserProfileRequest): Promise<UserProfileResponse>{
        const updateRequest = Validation.validate(UserProfileValidation.UPDATE, request)
        updateRequest.userId = user.id

        const result = await UserProfileRepository.updateUserProfile(updateRequest)

        return transformUserProfileResponse(result)
    }

    static async updateImage(request: UserRequest){
        const userId = request.user!.id
        const file = request.file

        if(!file){
            throw new ResponseError(400, "File must be provided")
        }

        try {
            const storageUrl = "https://storage.googleapis.com"
            const storageBucketName = process.env.GCLOUD_BUCKET_NAME!
            const extension = file.originalname.split(".").pop()
            const fileName = `profile-images/${Date.now()}-${userId}.${extension}`
            await storeFileToBucket(storageBucketName, fileName, file.buffer)

            const imageUrl = `${storageUrl}/${storageBucketName}/${fileName}`
            const result = await UserProfileRepository.updateUserProfileImage({userId, image: imageUrl})

            return transformUserProfileResponse(result)
        } catch {
            throw new ResponseError(500, "Something went wrong when saving the image")
        }
    }
}