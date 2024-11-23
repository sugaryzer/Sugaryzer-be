import { CreateProductRequest, ProductResponse, toProductResponse, UpdateProductRequest } from "../model/product-model";
import { ProductValidation } from "../validation/product-validation";
import { Validation } from "../validation/validation";
import { ProductRepository } from "../repository/product-repository";
import { ResponseError } from "../error/response-error";
import { prismaClient } from "../lib/db";

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
        const product = await ProductRepository.insertProduct(validatedRequest);

        //return formatted response
        return toProductResponse(product);
    }

    static async get( id?: number, name?: string, code?: string ): Promise<ProductResponse> {
        let product;

        if (id){
            product = await ProductRepository.findProductById(id);
        }
        else if (code){
            product = await ProductRepository.findProductByCode(code);
        }
        else if (name){
            product = await ProductRepository.findProductByName(name);
        }

        if (!product) {
            throw new ResponseError(404, 'Product not found.');
          }

        return toProductResponse(product);
    }

    //static async getAll(): Promise<ProductResponse>{
    //    const products = await ProductRepository.findProducts();
    //    return toProductResponse(products);
    //}

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