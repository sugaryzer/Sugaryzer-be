import { z, ZodType } from "zod";

export class ArticleValidation {

    static readonly GET: ZodType = z.object({
        page: z.number().min(1).positive(),
        size: z.number().min(1).max(100).positive(),
    })
}