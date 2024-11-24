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
            const id = Number(req.params.productId);
            if (!id) throw new ResponseError(400, `${req.params}`)
            const product = await ProductService.get(Number(id));
    
            if (!product) {
                throw new ResponseError(404, "Product not found.");
            }
    
            res.status(200).json({ data: product });
        } catch (error) {
            next(error);
        }
    }

    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const product = await ProductService.getAll();
    
            if (!product) {
                throw new ResponseError(404, "No product yet.");
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
            const id = req.params.productId;
            if (!id) throw new ResponseError(400, "Invalid parameter")
            await ProductService.delete(Number(id));
            res.status(200).json({
                data: "Product Deleted"
        });
        } catch (error) {
            next(error);
        }
    }

}