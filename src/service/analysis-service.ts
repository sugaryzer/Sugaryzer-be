import { ResponseError } from "../error/response-error";
import { AnalysisCreateRequest, AnalysisGetAllRequest, AnalysisResponse, AnalysisUpdateRequest, transformAnalysisResponse } from "../model/analysis-model";
import { Pageable } from "../model/page";
import { AnalysisRepository } from "../repository/analysis-repository";
import { AnalysisValidation } from "../validation/analysis-validation";
import { Validation } from "../validation/validation";

export class AnalysisService {

    static async getAll(request: AnalysisGetAllRequest, userId: string): Promise<Pageable<AnalysisResponse>>{
        const validated = Validation.validate(AnalysisValidation.GETALL, request);     
         
        const analyses = await AnalysisRepository.findAnalyses(validated, userId);

        const total = await AnalysisRepository.countAnalyses();
        return {
            data: analyses.map((analysis) => transformAnalysisResponse(analysis)),
            paging: {
                size: validated.size,
                total_page: Math.ceil(total / validated.size),
                current_page: validated.page,
            }
        }
    }

    static async get(date: string, userId: string): Promise <AnalysisResponse>{   
        const analysis = await AnalysisRepository.findAnalysisByDate(date, userId);

        if(!analysis){
            throw new ResponseError(404, "No analysis yet")
        }
        
        return transformAnalysisResponse(analysis);
    }

    static async create(request: AnalysisCreateRequest, userId: string): Promise <AnalysisResponse>{
        const rawdate = new Date (request.date as unknown as string);
        const date = rawdate.toISOString();
        if (request.date){
            const check = await AnalysisRepository.findAnalysisByDate(date, userId)
            if(check) throw new ResponseError(400, `Analysis by this date (${date}) already exist`)
        }

        const analysis = await AnalysisRepository.create(request.totalConsume, userId, date);
        
        return transformAnalysisResponse(analysis);
    }

    static async update(request: AnalysisUpdateRequest, userId: string): Promise <AnalysisResponse>{
        const analysis = await AnalysisRepository.update(request, userId);
        
        return transformAnalysisResponse(analysis);
    }

    static async remove(rawdate: string, userId: string){
        const stringDate = new Date (rawdate as unknown as string);
        const date = stringDate.toISOString();
        const analysis = await AnalysisRepository.findAnalysisByDate(date, userId); //check if exist
        if (analysis){
            await AnalysisRepository.delete(date, userId);
        }else{
            throw new ResponseError(404, 'Analysis does not exist.');
        }; 
    }

}