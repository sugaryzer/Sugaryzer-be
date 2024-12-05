import { NextFunction, Request, Response } from "express";
import { LoginUserRequest, RegisterUserRequest, UpdateUserRequest } from "../model/user-model";
import { UserService } from "../service/user-service";
import { UserRequest } from "../type/user-request";

export class UserController {

    static async register(req: Request, res: Response, next: NextFunction){
        try {
            const request: RegisterUserRequest = req.body as RegisterUserRequest
            const response = await UserService.register(request)
            res.status(200).json({
                error: false,
                message: "register successfully",
                result: response  
            })
        } catch (error){
            next(error)
        }
    }
    
    static async login(req: Request, res: Response, next: NextFunction){
        try {
            const request: LoginUserRequest = req.body as LoginUserRequest
            const response = await UserService.login(request)
            res.status(200).json({
                error: false,
                message: "login successfully",
                result: response  
            })
        } catch (error){
            next(error)
        }
    }

    static async get(req: UserRequest, res: Response, next: NextFunction){
        try {
            const response = await UserService.get(req.user!)
            res.status(200).json({
                error: false,
                message: "get current user successfully",
                result: response  
            })
        } catch (error){
            next(error)
        }
    }

    static async update(req: UserRequest, res: Response, next: NextFunction){
        try {
            const request: UpdateUserRequest = req.body as UpdateUserRequest
            const response = await UserService.update(req.user!, request)
            res.status(200).json({
                error: false,
                message: "update password successfully",
                result: response  
            })
        } catch (error){
            next(error)
        }
    }
    
}