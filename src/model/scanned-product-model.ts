import { Product } from "@prisma/client"

export type ScannedProductResponse = {
    id:          number,
    userId:      string,
    product:     Product,
    productId:   number,
    createdAt:   Date,
}

export type CreateScannedProductRequest = {
    productId:              number,
}

export type RemoveScannedProductRequest = {
    id: number,
}

export function toScannedProductResponse(scannedproduct: ScannedProductResponse) : ScannedProductResponse{
    return {
        id:          scannedproduct.id,
        userId:      scannedproduct.userId,
        product:     scannedproduct.product,
        productId:   scannedproduct.productId,
        createdAt:   scannedproduct.createdAt
    }
    }