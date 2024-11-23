import { NextFunction, Request, Response } from "express";
import { CreateProductRequest, RemoveProductRequest, UpdateProductRequest } from "../model/product-model";
import { ProductService } from "../service/product-service";
import { ResponseError } from "../error/response-error";

export class ProductController {

    static async create(req: Request, res: Response, next: NextFunction){
        try {
            const request: CreateProductRequest = req.body as CreateProductRequest;
            const response = await ProductService.create(request);
            res.status(200).json({
                data: response,
            })
        } catch (error) {
            next(error);
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, code, name } = req.query;
    
           // if (!id && !code && !name) {
           //     // No query parameters provided: return all products
           //     const products = await ProductService.getAll();
           //     return res.status(200).json({ data: products });
           // }
    
            // Handle query parameter logic
            const product = await ProductService.get(
                id ? Number(id) : undefined,
                code ? String(code) : undefined,
                name ? String(name) : undefined
            );
    
            if (!product) {
                throw new ResponseError(404, "Product not found.");
            }
    
            res.status(200).json({ data: product });
        } catch (error) {
            next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const request: UpdateProductRequest = req.body as UpdateProductRequest;

            const response = await ProductService.update(request);
            res.status(200).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    static async remove(req: Request, res: Response, next: NextFunction) {
        try {
            const request : RemoveProductRequest = req.body as RemoveProductRequest;
            await ProductService.delete(request.id);
            res.status(200).json({
                data: "Product Deleted"
        });
        } catch (error) {
            next(error);
        }
    }

}