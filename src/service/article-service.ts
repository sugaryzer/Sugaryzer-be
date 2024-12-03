import { Article } from "@prisma/client";
import { ArticleGetRequest, ArticleResponse, transformArticleResponse } from "../model/article-model";
import { ArticleRepository } from "../repository/article-repository";
import { ResponseError } from "../error/response-error";
import { Pageable } from "../model/page";
import { Validation } from "../validation/validation";
import { ArticleValidation } from "../validation/article-validation";

export class ArticleService {

    static async getAll(request: ArticleGetRequest): Promise<Pageable<ArticleResponse>>{
        const validated = Validation.validate(ArticleValidation.GET, request);     
         
        const articles = await ArticleRepository.findArticles(validated);
        const total = await ArticleRepository.countArticles();
        return {
            data: articles.map((article) => transformArticleResponse(article)),
            paging: {
                size: validated.size,
                total_page: Math.ceil(total / validated.size),
                current_page: validated.page,
            }
        }
    }

    static async get(articleId: number): Promise<ArticleResponse>{
        const article = await ArticleRepository.findArticleById(articleId)

        if(!article){
            throw new ResponseError(404, "Article not found")
        }
        
        return transformArticleResponse(article)
    }
}