import { CreateScannedProductRequest, ScannedProduct, ScannedProductGetRequest, ScannedProductResponse, toScannedProductResponse } from "../model/scanned-product-model";
import { ScannedProductValidation } from "../validation/scanned-product-validation";
import { Validation } from "../validation/validation";
import { ScannedProductRepository } from "../repository/scanned-product-repository";
import { ResponseError } from "../error/response-error";
import { ProductRepository } from "../repository/product-repository";
import { Pageable } from "../model/page";
import { AnalysisService } from "./analysis-service";
import { AnalysisRepository } from "../repository/analysis-repository";

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

    static async create(request: CreateScannedProductRequest, userId: string) : Promise<ScannedProductResponse> {
        //validate request
        const validatedRequest = Validation.validate(ScannedProductValidation.CREATE, request)

        const product = await ProductRepository.findProductByCode(validatedRequest.code); //check if product exist
        if (!product){
            throw new ResponseError (404, "Product does not exist")
        }

        //insert scanned product to db
        let scannedProduct: ScannedProduct = await ScannedProductRepository.createScannedProduct(request, product.id, userId) as any;

        //update current user analysis
        const currentDate = new Date();
        const dateOnly = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());//return YYYY-MM-DD no timestamp
        const isoDate = dateOnly.toISOString();//convert to ISO, return in YYYY-MM-DD:0000000
        const sugarConsume = scannedProduct.sugarConsume; //pull sugarConsume data
        const analysis = await AnalysisRepository.findAnalysisByDate(isoDate, userId) //check if analysis exist to update if not then create new one
        if(analysis){
            const totalConsume = analysis.totalConsume + sugarConsume;
            await AnalysisRepository.update(totalConsume, isoDate, userId)
        } else {
            await AnalysisRepository.create(sugarConsume, userId, isoDate)
        }

        //include product in response
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