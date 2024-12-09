import { z, ZodType } from "zod";

export class ScannedProductValidation {

    static readonly CREATE: ZodType = z.object({
        code: z.string({invalid_type_error: "Code must be type string"}),
        sugarConsume: z.number({invalid_type_error: "sugarConsume must be a number"})
    })

    static readonly GET: ZodType = z.object({
        page: z.number().min(1).positive(),
        size: z.number().min(1).max(100).positive(),
    })
}