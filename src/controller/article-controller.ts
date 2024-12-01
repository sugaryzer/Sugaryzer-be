import { NextFunction, Request, Response } from "express";
import { ArticleService } from "../service/article-service";

export class ArticleController {

    static async getAll(req: Request, res: Response, next: NextFunction){
        try {
            const response = await ArticleService.getAll()
            res.status(200).json({
                error: false,
                message: "get all articles successfully",
                result: response
            })
        } catch(error){
            next(error)
        }
    }

    static async get(req: Request, res: Response, next: NextFunction){
        try {
            const articleId = Number(req.params.articleId)
            const response = await ArticleService.get(articleId)
            res.status(200).json({
                error: false,
                message: "get an article successfully",
                result: response
            })
        } catch(error){
            next(error)
        }
    }
}