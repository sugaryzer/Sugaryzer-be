import request from "superagent";
import { prismaClient } from "../lib/db";
import { ScannedProduct, ScannedProductGetRequest } from "../model/scanned-product-model";
import { ResponseError } from "../error/response-error";


export class ScannedProductRepository {

    static async handleImageProcessing(data: Buffer){
        try {
            const response = await request.post(`${process.env.OCR_URL}`)
                .attach('file', data, 'file'); // (field?, image in Buffer(value), key)
                return response.body;
        } catch (error) {
            console.error(error);
        }
    }
    
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

   static async createScannedProduct(productId: number, userId: string) : Promise<ScannedProduct> {
    return await prismaClient.scannedproduct.create({
        data: {
            userId: userId,
            productId: productId,
        },
        include: {
            product: true,
        }
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