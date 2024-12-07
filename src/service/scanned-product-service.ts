import { ImageScanResponse, ScannedProduct, ScannedProductGetRequest, ScannedProductResponse, toScannedProductResponse } from "../model/scanned-product-model";
import { ScannedProductValidation } from "../validation/scanned-product-validation";
import { Validation } from "../validation/validation";
import { ScannedProductRepository } from "../repository/scanned-product-repository";
import { ResponseError } from "../error/response-error";
import { ProductRepository } from "../repository/product-repository";
import { Pageable } from "../model/page";

export class ScannedProductService {
    
    static async getAll(request: ScannedProductGetRequest): Promise<Pageable<ScannedProductResponse>>{
        const validated = Validation.validate(ScannedProductValidation.GET, request);     
         
        const scannedProducts = await ScannedProductRepository.findScannedProducts(validated);
        const total = await ScannedProductRepository.countScannedProducts();

        if (!scannedProducts) {
            throw new ResponseError(404, "No product yet.");
        }

        return {
            data: scannedProducts.map((product) => toScannedProductResponse(product)),
            paging: {
                size: validated.size,
                total_page: Math.ceil(total / validated.size),
                current_page: validated.page,
            }
        }
    }

    static async getByUserId( request: ScannedProductGetRequest, userId: string ): Promise<Pageable<ScannedProductResponse>> {
        const validated = Validation.validate(ScannedProductValidation.GET, request);

        const scannedProducts = await ScannedProductRepository.findAllByUserId(validated, userId);
        const total = await ScannedProductRepository.countScannedProducts();

        if (!scannedProducts) {
            throw new ResponseError(404, 'Scanned product not found.');
          }

          return {
            data: scannedProducts.map((product) => toScannedProductResponse(product)),
            paging: {
                size: validated.size,
                total_page: Math.ceil(total / validated.size),
                current_page: validated.page,
            }
        }
    }

    static async get ( userId: string, scannedProductId: number ): Promise<ScannedProductResponse>{
        const ScannedProducts = await ScannedProductRepository.find(userId, scannedProductId);

        if (!ScannedProducts) {
            throw new ResponseError(404, 'Scanned product not found.');
          }

        return toScannedProductResponse(ScannedProducts);
    }

    static async create(req: Buffer, userId: string) : Promise<ScannedProductResponse> {
        //const validatedRequest = Validation.validate(ScannedProductValidation.CREATE, request)

        if(!req){
            throw new ResponseError(400, "File must be provided")
        }

        const scanResponse : ImageScanResponse = await ScannedProductRepository.handleImageProcessing(req);

        if(!scanResponse) {
            throw new ResponseError(400, "Failed to scan barcode");
        }


        const product = await ProductRepository.findProductByCode(scanResponse.barcode);
        if(!product) {
            throw new ResponseError(400, `Product with barcode ${scanResponse.barcode} you are trying to scan does not exist in database or OCR model failed`, );
        }

        //insert scanning to db so it can be used as history
        const scannedProduct: ScannedProduct = await ScannedProductRepository.createScannedProduct(product.id, userId);

        //include scanned product in response
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