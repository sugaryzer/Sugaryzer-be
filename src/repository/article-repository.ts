import { prismaClient } from "../lib/db";
import { ArticleGetRequest } from "../model/article-model";

export class ArticleRepository {

    static async findArticles(data: ArticleGetRequest){
        const skip = (data.page - 1) * data.size;
        return await prismaClient.article.findMany({
            take: data.size,
            skip: skip
        })
    }
    
    static async countArticles(){
        return await prismaClient.article.count()
    }
    
    static async findArticleById(articleId: number){
        return await prismaClient.article.findUnique({
            where: {
                id: articleId
            }
        })
    }
}