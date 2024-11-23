import { Response, NextFunction } from "express";
import { UserRequest } from "../type/user-request";
import jwt from 'jsonwebtoken'
import { User } from "@prisma/client";

export const authMiddleware = async (req: UserRequest, res: Response, next: NextFunction) => {
    const {authorization: accessToken} = req.headers

    if (accessToken){
        const secret = process.env.ACCESS_TOKEN_SECRET!
        const decodedAccessToken = jwt.verify(accessToken, secret)
        
        if(typeof decodedAccessToken !== 'string'){
            req.user = decodedAccessToken as User
            next()
            return
        }
    }

    res.status(401).json({
        errors: "Unauthorized"
    }).end()

}