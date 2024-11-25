import { Product } from "@prisma/client";

export type RecommendationResponse = {
    altProduct:        Product;
    productId:         number;
    altProductId:      number;
    sugarDifference:   number;
}

export type CreateRecommendationRequest = {
    productId: number;
    altProductId:      number;
    sugarDifference:   number;
}

export function toRecommendationResponse(recommendation: RecommendationResponse) : RecommendationResponse{
    return {
        altProduct: recommendation.altProduct,
        productId: recommendation.productId,
        altProductId: recommendation.altProductId,
        sugarDifference: recommendation.sugarDifference,
    }
}
