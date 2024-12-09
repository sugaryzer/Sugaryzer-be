import { UserResponse, RegisterUserRequest, LoginUserRequest, transformUserResponse, UpdateUserRequest } from "../model/user-model";
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
            id: user.id,
            email: user.email
        }
        const secret = process.env.ACCESS_TOKEN_SECRET!
        const accessToken = jwt.sign(payload, secret, {expiresIn: 60 * 60 * 24 * 7})

        const response = transformUserResponse(user)
        response.access_token = accessToken
        return response
    }

    static async get(user: User): Promise<UserResponse> {
        return transformUserResponse(user)
    }

    static async update(user: User, request: UpdateUserRequest): Promise<UserResponse> {
        const updateRequest = Validation.validate(UserValidation.UPDATE, request)

        if (updateRequest.password){
            updateRequest.password = await bcrypt.hash(updateRequest.password, 10)
        }

        const result = await UserRepository.updateCurrentUser(user, updateRequest)

        return transformUserResponse(result)

    }

    static async getByUserId(id: string): Promise<UserResponse>{
        const user = await UserRepository.findUserById(id);
        if (!user) throw new ResponseError(404, "This user does not exist")
        return transformUserResponse(user);
    }
}