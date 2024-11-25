import { connect } from "http2";
import { ResponseError } from "../error/response-error";
import { prismaClient } from "../lib/db";
import { CreateScannedProductRequest } from "../model/scanned-product-model";
import { ProductRepository } from "./product-repository";

export class ScannedProductRepository {
    
    static async findAll () {
        return await prismaClient.scannedproduct.findMany({
            include: {
                product: true,
            },
        });
    }

    static async findAllByUserId (userId: string) {
        return await prismaClient.scannedproduct.findMany({
            where: {
                userId: userId
            },
            include: {
                product: true,
            }
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

}