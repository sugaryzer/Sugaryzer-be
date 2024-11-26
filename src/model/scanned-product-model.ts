import { Product } from "@prisma/client"
import { ProductResponse, toProductResponse } from "./product-model"

export type ScannedProductResponse = {
    id:          number,
    userId:      string,
    product:     ProductResponse,
    productId:   number,
    createdAt:   Date,
}

export type CreateScannedProductRequest = {
    productId:              number,
}

export type RemoveScannedProductRequest = {
    id: number,
}

export type ScannedProduct = {
    id:          number,
    userId:      string,
    product:     Product,
    productId:   number,
    createdAt:   Date,
}

export function toScannedProductResponse(scannedproduct: ScannedProduct) : ScannedProductResponse{
    return {
        id:          scannedproduct.id,
        userId:      scannedproduct.userId,
        product:     toProductResponse(scannedproduct.product),
        productId:   scannedproduct.productId,
        createdAt:   scannedproduct.createdAt
    }
    }