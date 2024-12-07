import { z, ZodType } from "zod";

export class AnalysisValidation {

    static readonly GETALL: ZodType = z.object({
        page: z.number().min(1).positive(),
        size: z.number().min(1).max(100).positive(),
    })
    
}