import { z, ZodType } from "zod";

export class ScannedProductValidation {

    static readonly CREATE: ZodType = z.object({
        productId: z.number({invalid_type_error: "Product ID must be a number"})
    })

}