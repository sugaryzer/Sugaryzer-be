import { ResponseError } from "../error/response-error";
import { CreateRecommendationRequest, RecommendationResponse, toRecommendationResponse } from "../model/recommendations-model";
import { RecommendationRepository } from "../repository/recommendation-repository";
import { RecommendationValidation } from "../validation/recommendation-validation";
import { Validation } from "../validation/validation";

export class RecommendationService {

    static async get ( id: number ): Promise<RecommendationResponse[]> {
        const recommendations = await RecommendationRepository.findRecommendationsByProductId(id);

        if (!recommendations) {
            throw new ResponseError(404, 'Recommendation not found.');
          }

        return recommendations.map(rec => (toRecommendationResponse(rec)));
    }

    static async create ( request: CreateRecommendationRequest ): Promise<RecommendationResponse> {
        //validate request
        const validatedRequest = Validation.validate(RecommendationValidation.CREATE, request)
                
        //find existing recommendation by code
        const existingRecommendation = await RecommendationRepository.findRecommendationByAltId(validatedRequest.altProductId, validatedRequest.productId);
        if(existingRecommendation) {
            throw new ResponseError(400, `Recommendation with productId ${validatedRequest.altProductId} for productId ${validatedRequest.productId} already exists`)
        }

        //insert recommendation to db
        const recommendation = await RecommendationRepository.createRecommendation(validatedRequest);

        //return formatted response
        return toRecommendationResponse(recommendation);
    }

}