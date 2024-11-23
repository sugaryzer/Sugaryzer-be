import { prismaClient } from "../lib/db";
import { CreateProductRequest, ProductResponse, UpdateProductRequest } from "../model/product-model";

export class ProductRepository {
    static async findProducts(skip = 0, take = 10){
        return prismaClient.product.findMany({
            skip,
            take,
        });
    }

    static async findProductByName(name: string){
        return prismaClient.product.findFirst({
            where: { name },
        });
    }

    static async findProductByCode(code: string){
        return prismaClient.product.findFirst({
            where: { code },
        });
    }

    static async findProductById(id: number){
        return prismaClient.product.findUnique({
            where: { id },
        });
    }

    static async insertProduct(productData: CreateProductRequest){
        return prismaClient.product.create({
            data: productData,
        });
    }

    static async updateProductbyId(productData: UpdateProductRequest){

        const product = await prismaClient.product.update({
            where: {
                id: productData.id,           
            },
            data: {
                name: productData.name,
                image: productData.image,
                category: productData.category,
                amountOfSugar: productData.amountOfSugar,
            }
        })

        return product;
        
    }

    static async deleteProductbyId(id:number){
        await prismaClient.product.delete({
            where: {
                id
            }
        })
    }
}