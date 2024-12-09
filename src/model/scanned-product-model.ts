import { Product } from "@prisma/client"
import { ProductResponse, toProductResponse } from "./product-model"

export type ScannedProductResponse = {
    id:          number,
    userId:      string,
    product:     ProductResponse,
    productId:   number,
    sugarConsume:number,
    createdAt:   Date,
}

export type CreateScannedProductRequest = {
    code:                   string,
    sugarConsume:           number,
}

export type RemoveScannedProductRequest = {
    id: number,
}

export type ScannedProductGetRequest = {
    page: number;
    size: number;
}

export type ScannedProduct = {
    id:          number,
    userId:      string,
    product:     Product,
    productId:   number,
    sugarConsume:number,
    createdAt:   Date,
}

export function toScannedProductResponse(scannedproduct: ScannedProduct) : ScannedProductResponse{
    return {
        id:          scannedproduct.id,
        userId:      scannedproduct.userId,
        product:     toProductResponse(scannedproduct.product),
        productId:   scannedproduct.productId,
        sugarConsume:scannedproduct.sugarConsume,
        createdAt:   scannedproduct.createdAt
    }
    }