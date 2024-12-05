import { z, ZodType } from "zod";

export class ProductValidation {

    static readonly CREATE: ZodType = z.object({
        code: z.string()
            .regex(/^[a-zA-Z0-9 ]*$/, "No special characters are allowed"),
        name: z.string()
            .min(1, 'Product name is required')
            .max(100, 'Product name must be at most 100 characters'),
        image: z.string()
            .min(1, 'Image is required')
            .url('Image must be a valid URL'),
        category: z.string()
            .min(1, 'Category is required')
            .max(100),
        amountOfSugar: z.number()
            .min(0, 'Sugar amount must be at least 0')
            .max(500, 'Sugar amount must be less than or equal to 500'),
    })

    static readonly UPDATE: ZodType = z.object({
        id: z.number({invalid_type_error: "id must be a number"}),
        name: z.string()
            .min(1, 'Product name is required')
            .max(100, 'Product name must be at most 100 characters')
            .optional(),
        image: z.string()
            .min(1, 'Image is required')
            .url('Image must be a valid URL')
            .optional(),
        category: z.string()
            .min(1, 'Category is required')
            .max(100)
            .optional(),
        amountOfSugar: z.number()
            .min(0, 'Sugar amount must be at least 0')
            .max(500, 'Sugar amount must be less than or equal to 500')
            .optional(),
    })

    static readonly GET: ZodType = z.object({
        page: z.number().min(1).positive(),
        size: z.number().min(1).max(100).positive(),
    })
}