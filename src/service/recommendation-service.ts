import { ResponseError } from "../error/response-error";
import { ArrayResponse } from "../model/page";
import { MLResponse, RecommendationResponse, toRecommendationResponse } from "../model/recommendations-model";

import { RecommendationRepository } from "../repository/recommendation-repository";


export class RecommendationService {

    static async get ( code: string ): Promise<ArrayResponse<RecommendationResponse>> {
        const recommendations:MLResponse[] = await RecommendationRepository.findRecommendationsByProductCode(Number(code));
        if (!recommendations) {
            throw new ResponseError(404, 'Recommendation not found.');
          }
          const data = await Promise.all(
            recommendations.map((rec: MLResponse) => toRecommendationResponse(rec, code)) // Await all promises
        );
        console.log(data)
        return {
            data,
        }
    }

}