import { z, ZodType } from "zod";

export class RecommendationValidation {

    static readonly CREATE: ZodType = z.object({
        productId: z.number({invalid_type_error: "Product ID must be a number"}),
        altProductId: z.number({invalid_type_error: "Alternative Product ID must be a number"}),
        sugarDifference: z.number({invalid_type_error: "Sugar difference must be a number"}).optional(),
    })

    static readonly GET: ZodType = z.object({
        page: z.number().min(1).positive(),
        size: z.number().min(1).max(100).positive(),
    })

}