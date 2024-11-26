import { z, ZodType } from "zod"

export class UserValidation {

    static readonly REGISTER: ZodType = z.object({
        email: z.string().min(1, "Email is required").max(100),
        password: z.string().min(1, "Password is required").max(100),
        name: z.string().min(1, "Name is required").max(100),
        image: z.string().min(1).max(255).optional(),
        height: z.number().max(200).positive(),
        weight: z.number().max(200).positive(),
        age: z.number().max(100).positive()
    })

    static readonly LOGIN: ZodType = z.object({
        email: z.string().min(1, "Email is required").max(100),
        password: z.string().min(1, "Password is required").max(100)
    })

    static readonly UPDATE: ZodType = z.object({
        password: z.string().min(1).max(100).optional()
    })

}