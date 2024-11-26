import { z, ZodType } from "zod";

export class UserProfileValidation {

    static readonly UPDATE: ZodType = z.object({
        name: z.string().min(1).max(100).optional(),
        image: z.string().min(1).max(255).optional(),
        height: z.number().max(200).positive().optional(),
        weight: z.number().max(200).positive().optional(),
        age: z.number().max(100).positive().optional()
    })
}