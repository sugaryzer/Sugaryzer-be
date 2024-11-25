import { Article } from "@prisma/client";
import { ArticleResponse, transformArticleResponse } from "../model/article-model";
import { ArticleRepository } from "../repository/article-repository";
import { ResponseError } from "../error/response-error";

export class ArticleService {

    static async getAll(): Promise<Array<ArticleResponse>>{
        const articles = await ArticleRepository.findArticles()
        return articles.map((article) => transformArticleResponse(article))
    }

    static async get(articleId: number){
        const article = await ArticleRepository.findArticleById(articleId)

        if(!article){
            throw new ResponseError(404, "Article not found")
        }
        
        return transformArticleResponse(article)
    }
}