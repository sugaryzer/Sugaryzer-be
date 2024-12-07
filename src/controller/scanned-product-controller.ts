import { Request, Response, NextFunction } from "express";
import { ResponseError } from "../error/response-error";
import { ScannedProductService } from "../service/scanned-product-service";
import { CreateScannedProductRequest, ScannedProductGetRequest } from "../model/scanned-product-model";
import { UserRequest } from "../type/user-request";

export class ScannedProductController {

    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const request: ScannedProductGetRequest = {
                page: req.query.page ? Number(req.query.page) : 1,
                size: req.query.size ? Number(req.query.size) : 10,
            }
            const response = await ScannedProductService.getAll(request);
            res.status(200).json({
                error: false,
                message: "Scanned products history retrieved successfully",
                result: response,
            })
        } catch (error) {
            next(error);
        }
    }

    static async getAllByUserId(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: ScannedProductGetRequest = {
                page: req.query.page ? Number(req.query.page) : 1,
                size: req.query.size ? Number(req.query.size) : 10,
            }

            if (!req.user) {
                throw new Error('User not authenticated');
              }

            const response = await ScannedProductService.getByUserId(request, req.user.id);
    
            res.status(200).json({
                error: false,
                message: "Scanned products history retrieved successfully",
                result: response,
            })
        } catch (error) {
            next(error);
        }
    }

    static async get (req: UserRequest, res: Response, next: NextFunction) {
        try {
            if (!req.user) {
                throw new Error('User not authenticated');
              }
            const scannedProductId = Number(req.params.scannedProductId);

            const response = await ScannedProductService.get(req.user.id, scannedProductId)

            if (!response) {
                throw new ResponseError(404, "No scanned product found.");
            }

            res.status(200).json({
                error: false,
                message: "Scanned product history retrieved successfully",
                result: response,
            })
        } catch (error) {
            next(error);
        }
    }

    static async create (req: UserRequest, res: Response, next: NextFunction) {
        try {
            if (!req.user) {
                throw new Error('User not authenticated');
              }
        
            const request: CreateScannedProductRequest = req.body as CreateScannedProductRequest;
            const response = await ScannedProductService.create(request, req.user.id)
            
            res.status(200).json({
                error: false,
                message: "History created successfully",
                result: response,
            })
        } catch (error) {
            next(error)
        }
    }

    static async remove (req: UserRequest, res: Response, next: NextFunction) {
        try {
            if (!req.user) {
                throw new Error('User not authenticated');
              }
            const scannedProductId = Number(req.params.scannedproductid);
            await ScannedProductService.delete(scannedProductId, req.user.id);
            res.status(200).json({
                error: false,
                message: "scanned product history deleted successfully",
            })
        } catch (error) {
            next(error);
        }
    }

}