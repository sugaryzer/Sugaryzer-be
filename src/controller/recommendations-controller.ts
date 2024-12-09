import { Request, Response, NextFunction } from "express";
import { ResponseError } from "../error/response-error";
import { RecommendationService } from "../service/recommendation-service";


export class RecommendationController {
  static async get ( req: Request, res: Response, next: NextFunction ) {
    try {   
        const code = req.params.productBarcode;

        const response = await RecommendationService.get(code);

        if (response.data.length === 0) {
            throw new ResponseError(404, "No recommendations.");
        }

        res.status(200).json({
          error: false,
          message: "Recommendations retrieved successfully",
          result: response,
      })
    } catch (error) {
        next(error);
    }
  }

}