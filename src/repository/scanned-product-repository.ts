import { prismaClient } from "../lib/db";
import { CreateScannedProductRequest, ScannedProduct, ScannedProductGetRequest } from "../model/scanned-product-model";


export class ScannedProductRepository {
    
    static async findScannedProducts(data: ScannedProductGetRequest){
        const skip = (data.page - 1) * data.size;
        return await prismaClient.scannedproduct.findMany({
            include: {
                product: true,
            },
            take: data.size,
            skip: skip
        })
    }


    static async findAll () {
        return await prismaClient.scannedproduct.findMany({
            include: {
                product: true,
            },
        });
    }

    static async findAllByUserId (data: ScannedProductGetRequest ,userId: string) {
        const skip = (data.page - 1) * data.size;
        return await prismaClient.scannedproduct.findMany({
            where: {
                userId: userId
            },
            include: {
                product: true,
            },
            take: data.size,
            skip: skip
        })
    }

    static async find (userId: string, id: number) {
        return await prismaClient.scannedproduct.findUnique({
            where: {
                userId: userId,
                id: id,
            },
            include: {
                product: true,
            }
        })
    }

    static async createScannedProduct(request: CreateScannedProductRequest, userId: string) {
        return await prismaClient.scannedproduct.create({
            data: {
                userId: userId,
                sugarConsume: request.sugarConsume,
                productId: request.productId,
            },
        });
       }

   static async deleteById(id: number) {
    await prismaClient.scannedproduct.delete({
        where: {
            id
        }
    })
   }

   static async countScannedProducts(){
    return await prismaClient.scannedproduct.count()
}
}