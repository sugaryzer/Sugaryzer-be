import { Request, Response, NextFunction, response } from "express";
import { ResponseError } from "../error/response-error";
import { ScannedProductService } from "../service/scanned-product-service";
import { CreateScannedProductRequest, RemoveScannedProductRequest } from "../model/scanned-product-model";
import { UserService } from "../service/user-service";

export class ScannedProductController {

    static async getAll(req: Request, res: Response, next: Function) {
        try {
            const response = await ScannedProductService.getAll();
    
            if (!response) {
                throw new ResponseError(404, "No scanned product found.");
            }
    
            res.status(200).json({ data: response });
        } catch (error) {
            
        }
    }

    static async getAllByUserId(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.userId;

            //check if user exist
            await UserService.getByUserId(userId)

            const response = await ScannedProductService.getByUserId(userId);
    
            if (response.length == 0) {
                throw new ResponseError(404, "No scanned product found.");
            }
    
            res.status(200).json({ data: response });
        } catch (error) {
            next(error);
        }
    }

    static async get (req: Request, res: Response, next: Function) {
        try {
            const userId = req.params.userId;
            const scannedProductId = Number(req.params.scannedProductId);

            const scannedProduct = await ScannedProductService.get(userId, scannedProductId)

            if (!scannedProduct) {
                throw new ResponseError(404, "No scanned product found.");
            }

            res.status(200).json({ data: scannedProduct });
        } catch (error) {
            next(error);
        }
    }

    static async create (req: Request, res: Response, next: Function) {
        try {
            const userId = req.params.userId
            await UserService.getByUserId(userId)//check if user exist
            const request: CreateScannedProductRequest = req.body as CreateScannedProductRequest;
            const response = await ScannedProductService.create(request, userId)
            
            res.status(200).json({ data: response })
        } catch (error) {
            next(error)
        }
    }

    static async remove (req: Request, res: Response, next: Function) {
        try {
            const userId = req.params.userId;
            //check if user exist
            await UserService.getByUserId(userId)
            const scannedProductId = Number(req.params.scannedproductid);
            await ScannedProductService.delete(scannedProductId, userId);
            res.status(200).json({
                data: "Scanned product deleted"
        });
        } catch (error) {
            next(error);
        }
    }

}