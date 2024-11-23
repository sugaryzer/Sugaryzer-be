import { UserResponse, RegisterUserRequest, transformUserResponse, LoginUserRequest } from "../model/user-model";
import { Validation } from "../validation/validation";
import { UserValidation } from "../validation/user-validation";
import { ResponseError } from "../error/response-error";
import bcrypt from "bcrypt"
import { UserRepository } from "../repository/user-repository";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";

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

    static async login(request: LoginUserRequest): Promise<UserResponse> {
        const loginRequest = Validation.validate(UserValidation.LOGIN, request)

        const user = await UserRepository.findEmailById(loginRequest)
        if (!user){
            throw new ResponseError(401, "Email or password is wrong")
        }

        const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password)
        if(!isPasswordValid){
            throw new ResponseError(401, "Email or password is wrong")
        }

        const payload = {
            name: user.name,
            email: user.email
        }
        const secret = process.env.ACCESS_TOKEN_SECRET!
        const accessToken = jwt.sign(payload, secret, {expiresIn: 60 * 60 * 1})

        const response = transformUserResponse(user)
        response.access_token = accessToken
        return response
    }

    static async get(user: User): Promise<UserResponse> {
        return transformUserResponse(user)
    }
}