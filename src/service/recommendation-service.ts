import { ResponseError } from "../error/response-error";
import { Pageable } from "../model/page";
import { CreateRecommendationRequest, GetRecommendationRequest, RecommendationResponse, toRecommendationResponse } from "../model/recommendations-model";
import { RecommendationRepository } from "../repository/recommendation-repository";
import { RecommendationValidation } from "../validation/recommendation-validation";
import { Validation } from "../validation/validation";

export class RecommendationService {

    static async get ( id: number, request: GetRecommendationRequest ): Promise<Pageable<RecommendationResponse>> {
        const validated = Validation.validate(RecommendationValidation.GET, request);  
        const recommendations = await RecommendationRepository.findRecommendationsByProductId(id, request);

        if (!recommendations) {
            throw new ResponseError(404, 'Recommendation not found.');
          }

        const total = await RecommendationRepository.countReccomendations();
        return {
            data: recommendations.map((rec) => toRecommendationResponse(rec)),
            paging: {
                size: validated.size,
                total_page: Math.ceil(total / validated.size),
                current_page: validated.page,
            }
        }
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