import { UserResponse, RegisterUserRequest, transformUserResponse } from "../model/user-model";
import { Validation } from "../validation/validation";
import { UserValidation } from "../validation/user-validation";
import { ResponseError } from "../error/response-error";
import bcrypt from "bcrypt"
import { UserRepository } from "../repository/user-repository";

export class UserService {

    static async register(request: RegisterUserRequest): Promise<UserResponse> {
        const registerRequest = Validation.validate(UserValidation.REGISTER, request)

        const isEmailUsed = await UserRepository.countUserEmail(registerRequest)

        if (isEmailUsed != 0){
            throw new ResponseError(400, "Email is already used")
        }

        registerRequest.password = await bcrypt.hash(registerRequest.password, 10)

        const user = await UserRepository.createUser(registerRequest)
        
        return transformUserResponse(user)
    }
}