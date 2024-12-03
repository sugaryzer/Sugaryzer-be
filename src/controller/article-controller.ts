import { NextFunction, Request, Response } from "express";
import { ArticleService } from "../service/article-service";
import { ArticleGetRequest } from "../model/article-model";

export class ArticleController {

    static async getAll(req: Request, res: Response, next: NextFunction){
        try {
            const request: ArticleGetRequest = {
                page: req.query.page ? Number(req.query.page) : 1,
                size: req.query.size ? Number(req.query.size) : 10,
            }
            const response = await ArticleService.getAll(request)
            res.status(200).json({
                error: false,
                message: "articles retrieved successfully",
                result: response,
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