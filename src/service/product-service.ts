import { createProductRequest, productResponse } from "../model/product-model";
import { productValidation } from "../validation/product-validation";
import { Validation } from "../validation/validation";
import { productRepository } from "../repository/product-repository";
import { ResponseError } from "../error/response-error";

export class productService {
    
    static async create(request: createProductRequest) : Promise<productResponse> {
        const createRequest = Validation.validate(productValidation.CREATE, request)

        const existingProduct = productRepository.findProductByName(createRequest.name);
        if(existingProduct) {
            throw new ResponseError(400, "Product already exists")
        }
    }

}
