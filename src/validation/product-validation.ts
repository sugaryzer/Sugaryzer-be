import { z, ZodType } from "zod";

export class productValidation {

    static readonly CREATE: ZodType = z.object({
        name: z.string().min(1, 'Name is required'),
        image: z.string().min(1, 'Image is required'),
        category: z.string().min(1, 'Category is required').max(100),
        amountOfSugar: z.string().min(1, 'Sugar amount is required').max(10),
    })

}