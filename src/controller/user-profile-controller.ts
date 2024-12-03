import { Response, NextFunction } from "express";
import { UpdateUserProfileRequest } from "../model/user-profile-model";
import { UserProfileService } from "../service/user-profile-service";
import { UserRequest } from "../type/user-request";

export class UserProfileController {

    static async get(req: UserRequest, res: Response, next: NextFunction){
        try {
            const response = await UserProfileService.get(req.user!)
            res.status(200).json({
                error: false,
                message: "get user profile successfully",
                result: response
            })
        } catch(error){
            next(error)
        }
    }
    static async update(req: UserRequest, res: Response, next: NextFunction){
        try {
            const request: UpdateUserProfileRequest = req.body as UpdateUserProfileRequest
            const response = await UserProfileService.update(req.user!, request)
            res.status(200).json({
                error: false,
                message: "update user profile successfully",
                result: response
            })
        } catch(error){
            next(error)
        }
    }

    static async updateImage(req: UserRequest, res: Response, next: NextFunction){
        try {
            const response = await UserProfileService.updateImage(req)
            res.status(200).json({
                error: false,
                message: "update profile image successfully",
                result: response
            })
        } catch(error){
            next(error)
        }
    }
}