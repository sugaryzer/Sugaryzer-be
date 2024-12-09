import request from "superagent";
import { MLResponse } from "../model/recommendations-model";


export class RecommendationRepository {
    static async findRecommendationsByProductCode(code: number): Promise <MLResponse[]> {
        const response = await request.post(`${process.env.ML_URL}/recommend`)
                        .send({ product_id: code });
        return response.body as MLResponse[];
    }
}