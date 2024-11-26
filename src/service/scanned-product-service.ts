import { CreateScannedProductRequest, ScannedProduct, ScannedProductResponse, toScannedProductResponse } from "../model/scanned-product-model";
import { ScannedProductValidation } from "../validation/scanned-product-validation";
import { Validation } from "../validation/validation";
import { ScannedProductRepository } from "../repository/scanned-product-repository";
import { ResponseError } from "../error/response-error";
import { ProductRepository } from "../repository/product-repository";

export class ScannedProductService {
    
    static async getAll(): Promise<Array<ScannedProductResponse>>{
        const ScannedProducts = await ScannedProductRepository.findAll();
        return ScannedProducts.map((ScannedProducts) => toScannedProductResponse(ScannedProducts));
    }

    static async getByUserId( userId: string ): Promise<Array<ScannedProductResponse>> {
        const ScannedProducts = await ScannedProductRepository.findAllByUserId(userId);

        if (!ScannedProducts) {
            throw new ResponseError(404, 'Scanned product not found.');
          }

        return ScannedProducts.map((ScannedProducts) => toScannedProductResponse(ScannedProducts));
    }

    static async get ( userId: string, scannedProductId: number ): Promise<ScannedProductResponse>{
        const ScannedProducts = await ScannedProductRepository.find(userId, scannedProductId);

        if (!ScannedProducts) {
            throw new ResponseError(404, 'Scanned product not found.');
          }

        return toScannedProductResponse(ScannedProducts);
    }

    static async create(request: CreateScannedProductRequest, userId: string) : Promise<ScannedProductResponse> {
        //validate request
        const validatedRequest = Validation.validate(ScannedProductValidation.CREATE, request)

        //insert scanned product to db
        let scannedProduct: ScannedProduct = await ScannedProductRepository.createScannedProduct(validatedRequest, userId) as any;
        //include product in response
        const product = await ProductRepository.findProductById(validatedRequest.productId);
        if (product) scannedProduct.product = product;
        //return formatted response
        return toScannedProductResponse(scannedProduct);
    }

    static async delete(id : number, userId: string){
        const product = await ScannedProductRepository.find(userId, id); //check if exist
        if (product){
            await  ScannedProductRepository.deleteById(id)
        }else{
            throw new ResponseError(404, 'Scanned product does not exist.');
        };
        
    }

}