import { prismaClient } from "../lib/db";
import { CreateRecommendationRequest } from "../model/recommendations-model";
import { ProductRepository } from "./product-repository";


export class RecommendationRepository {

    static async findRecommendationsByProductId(id: number) {
        return prismaClient.recommendation.findMany({
            where: {
                productId: id
            },
            include: {
                altProduct: true,
              }
        })
    }

    static async findRecommendationsByAltId(id: number) {
        return prismaClient.recommendation.findMany({
            where: {
                altProductId: id
            },
            include: {
                altProduct: true,
              }
        })
    }

    static async findRecommendationByAltId(altId: number, productId: number) {
        return prismaClient.recommendation.findFirst({
            where: {
                altProductId: altId,
                productId: productId
            },
            include: {
                altProduct: true,
              }
        })
    }

    static async createRecommendation(request: CreateRecommendationRequest){
        const product = await ProductRepository.findProductById(request.productId);
        const altProduct = await ProductRepository.findProductById(request.altProductId)

        // Check if products exist
        if (!product) {
            throw new Error(`Product with ID ${request.productId} not found.`);
        }
        if (!altProduct) {
            throw new Error(`Alternative product with ID ${request.altProductId} not found.`);
        }

        // Validate amountOfSugar
        if (product.amountOfSugar == null || altProduct.amountOfSugar == null) {
            throw new Error("One or both products have a null 'amountOfSugar' value.");
        }
        return prismaClient.recommendation.create({
            data: {
                productId: request.productId,
                altProductId: request.altProductId,
                sugarDifference: request.sugarDifference | altProduct.amountOfSugar - product.amountOfSugar,
            },
            include: {
                altProduct: true,
            }
        })
    }

}