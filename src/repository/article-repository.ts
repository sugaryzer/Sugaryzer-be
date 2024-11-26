import { prismaClient } from "../lib/db";

export class ArticleRepository {

    static async findArticles(){
        return await prismaClient.article.findMany()
    }

    static async findArticleById(articleId: number){
        return await prismaClient.article.findUnique({
            where: {
                id: articleId
            }
        })
    }
}