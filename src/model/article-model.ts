import { Article } from "@prisma/client"

export type ArticleResponse = {
    id: number;
    title: string;
    description: string;
    image: string;
    source: string
}

export type ArticleGetRequest = {
    page: number;
    size: number;
}

export function transformArticleResponse(article: Article): ArticleResponse{
    return {
        id: article.id,
        title: article.title,
        description: article.description,
        image: article.image,
        source: article.source
    }
}