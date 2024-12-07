import { Request, Response, NextFunction } from "express";
import { UserRequest } from "../type/user-request";
import { AnalysisCreateRequest, AnalysisGetAllRequest, AnalysisUpdateRequest } from "../model/analysis-model";
import { AnalysisService } from "../service/analysis-service";
import { ResponseError } from "../error/response-error";

export class AnalysisController {

    static async get(req: UserRequest, res: Response, next: NextFunction) {
        try {

            if (!req.user){
                throw new ResponseError (401, "Invalid User")
            }
            const userId = req.user.id;

            if(!req.query.date){
                const request: AnalysisGetAllRequest = {
                    page: req.query.page ? Number(req.query.page) : 1,
                    size: req.query.size ? Number(req.query.size) : 3,
                }

                const response = await AnalysisService.getAll(request, userId);
                res.status(200).json({
                    error: false,
                    message: "Analyses retrieved successfully",
                    result: response,
            })
            } else {
                const query = new Date (req.query.date as string);
                const date = query.toISOString();
                const response = await AnalysisService.get(date, userId);
                res.status(200).json({
                    error: false,
                    message: "Analysis retrieved successfully",
                    result: response,
                })
            }     

        } catch (error) {
            next(error);
        }
    }

    static async getAll(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: AnalysisGetAllRequest = {
                page: req.query.page ? Number(req.query.page) : 1,
                size: req.query.size ? Number(req.query.size) : 10,
            }

            if (!req.user){
                throw new ResponseError (401, "Invalid User")
            }

            const response = await AnalysisService.getAll(request, req.user.id);
            res.status(200).json({
                error: false,
                message: "Scanned products retrieved successfully",
                result: response,
            })
        } catch (error) {
            next(error);
        }
    }

    static async create(req: UserRequest, res: Response, next: NextFunction) {
        try {

            if (!req.user){
                throw new ResponseError (401, "Invalid User")
            }
            const request: AnalysisCreateRequest = req.body as AnalysisCreateRequest;

            const response = await AnalysisService.create(request, req.user.id);
            
            res.status(200).json({
                error: false,
                message: "Analysis data created successfully",
                result: response,
            })
        } catch (error) {
            next(error);
        }
    }

    static async patch(req: UserRequest, res: Response, next: NextFunction) {
        try {
            if (!req.user){
                throw new ResponseError (401, "Invalid User")
            }
            const request: AnalysisUpdateRequest = req.body as AnalysisUpdateRequest;

            const response = await AnalysisService.update(request, req.user.id);
            
            res.status(200).json({
                error: false,
                message: "Analysis updated successfully",
                result: response,
            })
        } catch (error) {
            next(error);
        }
    }

    static async remove(req: UserRequest, res: Response, next: NextFunction) {
        try {

            if (!req.user){
                throw new ResponseError (401, "Invalid User")
            }
            await AnalysisService.remove(req.params.date, req.user.id);
            res.status(200).json({
                error: false,
                message: "Analysis removed successfully",
            });
        } catch (error) {
            next(error);
        }
    }
    
}