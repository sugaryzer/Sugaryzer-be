import { Request, Response, NextFunction } from "express";
import { ResponseError } from "../error/response-error";
import { RecommendationService } from "../service/recommendation-service";
import { CreateRecommendationRequest } from "../model/recommendations-model";


export class RecommendationController {
  static async get ( req: Request, res: Response, next: NextFunction ) {
    try {
        const id = Number(req.params.productId);

        const response = await RecommendationService.get(id);

        if (response.length === 0) {
            throw new ResponseError(404, "No recommendations.");
        }

        res.status(200).json({
          error: false,
          message: "reccomendation retrieved successfully",
          result: response,
      })
    } catch (error) {
        next(error);
    }
  }

  static async create ( req: Request, res: Response, next: NextFunction ) {
    try {
        const request: CreateRecommendationRequest = req.body as CreateRecommendationRequest;
        if (!request.productId){
          request.productId = Number(req.params.productId);
        } 
        else if (request.productId !== Number(req.params.productId)){
            throw new ResponseError (400, `url params does not match the requested productId`)
        };
        const response = await RecommendationService.create(request);
        res.status(200).json({
          error: false,
          message: "reccomendation created successfully",
          result: response,
      })
    } catch (error) {
        next(error);
    }
  }

}