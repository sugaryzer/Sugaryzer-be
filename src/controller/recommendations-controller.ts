import { Request, Response, NextFunction } from "express";
import { ResponseError } from "../error/response-error";
import { RecommendationService } from "../service/recommendation-service";
import { CreateRecommendationRequest } from "../model/recommendations-model";


export class RecommendationController {
  static async get ( req: Request, res: Response, next: NextFunction ) {
    try {
        const id = Number(req.params.productId);

        const recommendation = await RecommendationService.get(id);

        if (!recommendation) {
            throw new ResponseError(404, "No recommendations.");
        }

        res.status(200).json({ data: recommendation });
    } catch (error) {
        next(error);
    }
  }

  static async create ( req: Request, res: Response, next: NextFunction ) {
    try {
        let request: CreateRecommendationRequest = req.body as CreateRecommendationRequest;
        request.productId = Number(req.params.productId);
        const response = await RecommendationService.create(request);
        res.status(200).json({
            data: response
        })
    } catch (error) {
        next(error);
    }
  }

}