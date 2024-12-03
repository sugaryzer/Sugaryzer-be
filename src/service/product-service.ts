import { CreateProductRequest, ProductGetRequest, ProductResponse, toProductResponse, UpdateProductRequest } from "../model/product-model";
import { ProductValidation } from "../validation/product-validation";
import { Validation } from "../validation/validation";
import { ProductRepository } from "../repository/product-repository";
import { ResponseError } from "../error/response-error";
import { Pageable } from "../model/page";

export class ProductService {
    
    static async create(request: CreateProductRequest) : Promise<ProductResponse> {
        //validate request
        const validatedRequest = Validation.validate(ProductValidation.CREATE, request)

        //find existing product by code
        const existingProduct = await ProductRepository.findProductByCode(validatedRequest.code);
        if(existingProduct) {
            throw new ResponseError(400, "Product already exists")
        }

        //insert product to db
        const product = await ProductRepository.createProduct(validatedRequest);

        //return formatted response
        return toProductResponse(product);
    }

    static async get( id: number ): Promise<ProductResponse> {
        const product = await ProductRepository.findProductById(id);

        if (!product) {
            throw new ResponseError(404, 'Product not found.');
          }

        return toProductResponse(product);
    }

    static async getAll(request: ProductGetRequest): Promise<Pageable<ProductResponse>>{
        const validated = Validation.validate(ProductValidation.GET, request);     
         
        const products = await ProductRepository.findProducts(validated);
        const total = await ProductRepository.countProducts();
        return {
            data: products.map((product) => toProductResponse(product)),
            paging: {
                size: validated.size,
                total_page: Math.ceil(total / validated.size),
                current_page: validated.page,
            }
        }
    }

    static async update(request: UpdateProductRequest) : Promise<ProductResponse> {
        const validatedRequest = Validation.validate(ProductValidation.UPDATE, request)
        
        const product = await ProductRepository.updateProductbyId(validatedRequest)

        return toProductResponse(product);
    }

    static async delete(id : number){
        const product = await ProductRepository.findProductById(id); //check if exist
        if (product){
            await  ProductRepository.deleteProductbyId(id)
        }else{
            throw new ResponseError(404, 'Product does not exist.');
        };
        
    }

}