import { Product } from "@prisma/client";

export type ProductResponse = {
    id: number;
    code: string;
    name: string;
    image: string;
    category: string;
    amountOfSugar: number;
}

export type CreateProductRequest = {
    code: string;
    name: string;
    image: string;
    category: string;
    amountOfSugar: number;  
}

export type UpdateProductRequest = {
    id: number;
    name: string;
    image: string;
    category: string;
    amountOfSugar: number;
}

export type RemoveProductRequest = {
    id:number;
}

export function toProductResponse(product: Product): ProductResponse {
    return{
        id: product.id,
        code: product.code,
        name: product.name,
        image: product.image,
        category: product.category,
        amountOfSugar: product.amountOfSugar,
    }
}