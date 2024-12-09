import { Request, Response, NextFunction } from "express";
import { ResponseError } from "../error/response-error";
import { RecommendationService } from "../service/recommendation-service";
import { AnalysisGetAllRequest } from "../model/analysis-model";


export class RecommendationController {
  static async get ( req: Request, res: Response, next: NextFunction ) {
    try {
        if(!req.query.date){
          const paging: AnalysisGetAllRequest = {
              page: req.query.page ? Number(req.query.page) : 1,
              size: req.query.size ? Number(req.query.size) : 3,
            }
            const code = req.params.productBarcode;
    
            const response = await RecommendationService.get(code, paging);
    
            if (response.data.length === 0) {
                throw new ResponseError(404, "No recommendations.");
            }
          res.status(200).json({
            error: false,
            message: "Recommendations retrieved successfully",
            result: response,
          })     
      }
    } catch (error) {
        next(error);
    }
  }

}