import { Product } from "@prisma/client";
import { ProductResponse, toProductResponse } from "./product-model";

export type RecommendationResponse = {
    altProduct:        ProductResponse;
    productId:         number;
    altProductId:      number;
    sugarDifference:   number;
}

export type CreateRecommendationRequest = {
    productId: number;
    altProductId:      number;
    sugarDifference:   number;
}

type Recommendation = {
    altProduct:        Product;
    productId:         number;
    altProductId:      number;
    sugarDifference:   number;
}

export function toRecommendationResponse(recommendation: Recommendation) : RecommendationResponse{
    return {
        altProduct: toProductResponse(recommendation.altProduct),
        productId: recommendation.productId,
        altProductId: recommendation.altProductId,
        sugarDifference: recommendation.sugarDifference,
    }
}
