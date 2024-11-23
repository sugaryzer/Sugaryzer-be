import { z, ZodType } from "zod"

export class UserValidation {

    static readonly REGISTER: ZodType = z.object({
        name: z.string().min(1, "Name is required").max(100),
        email: z.string().min(1, "Email is required").max(100),
        password: z.string().min(1, "Password is required").max(100)
    })
}