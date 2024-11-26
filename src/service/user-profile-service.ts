import { User } from "@prisma/client";
import { transformUserProfileResponse, UpdateUserProfileRequest, UserProfileResponse } from "../model/user-profile-model";
import { UserProfileValidation } from "../validation/user-profile-validation";
import { Validation } from "../validation/validation";
import { UserProfileRepository } from "../repository/user-profile-repository";
import { ResponseError } from "../error/response-error";

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
}