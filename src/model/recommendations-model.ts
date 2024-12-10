import { Product } from "@prisma/client";
import { ProductResponse, toProductResponse } from "./product-model";
import { ProductRepository } from "../repository/product-repository";


export type RecommendationResponse = {
    altProduct:        ProductResponse;
    productId:         number;
    altProductId:      number;
    sugarDifference:   number;
}

export type GetRecommendationRequest = {
    page: number;
    size: number;
}

export type CreateRecommendationRequest = {
    productId: number;
    altProductId:      number;
    sugarDifference:   number;
}

export type MLResponse = {
    category: string;
    product_id: number;
    product_name: string;
    sugar_intake: number;
}

export async function toRecommendationResponse(recommendation: MLResponse, productCode: string) : Promise<RecommendationResponse>{
    const altProduct: Product = await ProductRepository.findProductByCode(`${recommendation.product_id}`) ?? {
        name: recommendation.product_name,
        id: 0,
        code: `${recommendation.product_id}`,
        image: "N/A",
        category: recommendation.category,
        amountOfSugar: recommendation.sugar_intake,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    const product: Product = await ProductRepository.findProductByCode(`${productCode}`) ?? {
        name: "N/A",
        id: 0,
        code: "N/A",
        image: "N/A",
        category: "N/A",
        amountOfSugar: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    return {
        altProduct: toProductResponse(altProduct),
        productId: product.id,
        altProductId: altProduct.id,
        sugarDifference: recommendation.sugar_intake - product.amountOfSugar,
    }
}
