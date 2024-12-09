import { ResponseError } from "../error/response-error";
import { AnalysisGetAllRequest } from "../model/analysis-model";
import { Pageable } from "../model/page";
import { MLResponse, RecommendationResponse, toRecommendationResponse } from "../model/recommendations-model";

import { RecommendationRepository } from "../repository/recommendation-repository";


export class RecommendationService {

    static async get (code: string, paging: AnalysisGetAllRequest): Promise<Pageable<RecommendationResponse>> {
        const { page, size } = paging;

        const recommendations:MLResponse[] = await RecommendationRepository.findRecommendationsByProductCode(Number(code));
        if (!recommendations) {
            throw new ResponseError(404, 'Recommendation not found.');
          }

          const startIndex = (page - 1) * size;
          const endIndex = startIndex + size;
      
          // Slice the data to get only the requested page
          const paginatedData = recommendations.slice(startIndex, endIndex);

          const data = await Promise.all(
            paginatedData.map((rec: MLResponse) => toRecommendationResponse(rec, code)) // Await all promises
        );
        console.log(data)
        return {
            data,
            paging: {
                size: size,
                total_page: Math.ceil(recommendations.length),
                current_page: page,
            }
        }
    }

}