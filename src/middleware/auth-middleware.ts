import { Response, NextFunction } from "express";
import { UserRequest } from "../type/user-request";
import jwt, { JsonWebTokenError } from 'jsonwebtoken'
import { User } from "@prisma/client";

export const authMiddleware = async (req: UserRequest, res: Response, next: NextFunction) => {
    const {authorization} = req.headers
    
    if (authorization){
        const token = authorization.split(" ")
        const accessToken = token[token.length - 1]
        const secret = process.env.ACCESS_TOKEN_SECRET!
        try {
            const decodedAccessToken = jwt.verify(accessToken, secret)
            if(typeof decodedAccessToken !== 'string'){
                req.user = decodedAccessToken as User
                next()
                return
            }
        } catch(error){
            if(error instanceof JsonWebTokenError)
                res.status(400).json({
                    error: true,
                    message: error.message
                }).end()
                return
            }
    }

    res.status(401).json({
        error: true,
        message: "Unauthorized"
    }).end()
}