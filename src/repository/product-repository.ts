import request from "superagent";
import { prismaClient } from "../lib/db";
import { CreateProductRequest, ProductGetRequest, UpdateProductRequest } from "../model/product-model";

export class ProductRepository {

    static async findProducts(data: ProductGetRequest){
        const skip = (data.page - 1) * data.size;
        return await prismaClient.product.findMany({
            take: data.size,
            skip: skip
        })
    }

    static async findProductByName(name: string){
        return prismaClient.product.findFirst({
            where: { name },
        });
    }

    static async findProductByCode(code: string){
        return prismaClient.product.findUnique({
            where: { code },
        });
    }

    static async findProductById(id: number){
        return prismaClient.product.findUnique({
            where: { id },
        });
    }

    static async createProduct(productData: CreateProductRequest){
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

    static async countProducts(){
        return await prismaClient.product.count()
    }

    static async handleImageProcessing(data: Buffer){
        try {
            const response = await request.post(`${process.env.OCR_URL}`)
                .attach('file', data, 'file'); // (field?, image in Buffer(value), key)
                return response.body;
        } catch (error) {
            console.error(error);
        }
    }
    
}