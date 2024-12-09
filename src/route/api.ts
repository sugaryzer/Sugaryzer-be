import express from 'express';
import { ProductController } from '../controller/product-controller';
import { authMiddleware } from '../middleware/auth-middleware';
import { UserController } from '../controller/user-controller';
import { RecommendationController } from '../controller/recommendations-controller';
import { ScannedProductController } from '../controller/scanned-product-controller';
import { ArticleController } from '../controller/article-controller';
import { UserProfileController } from '../controller/user-profile-controller';
import { fileMiddleware } from '../middleware/file-middleware';
import { AnalysisController } from '../controller/analysis-controller';

export const apiRouter =  express.Router();
apiRouter.use(authMiddleware)

apiRouter.get("/api/users/current", UserController.get)
apiRouter.patch("/api/users/current", UserController.update)

apiRouter.get("/api/users/current/user-profile", UserProfileController.get)
apiRouter.patch("/api/users/current/user-profile", UserProfileController.update)
apiRouter.patch("/api/users/current/user-profile/image", fileMiddleware.single('image'), UserProfileController.updateImage)

apiRouter.get("/api/articles", ArticleController.getAll)
apiRouter.get("/api/articles/:articleId(\\d+)", ArticleController.get)

//Product API
apiRouter.post("/api/products", ProductController.create);
apiRouter.get("/api/products", ProductController.getAll);
apiRouter.patch("/api/products", ProductController.update);
apiRouter.post("/api/products/scan", fileMiddleware.single('file'), ProductController.scan);
apiRouter.get("/api/products/:productId(\\d+)", ProductController.get);
apiRouter.delete("/api/products/:productId(\\d+)", ProductController.remove);

//Recommendations API
apiRouter.get("/api/products/:productBarcode(\\d+)/recommendations", RecommendationController.get);

//Scanned Products API
apiRouter.get("/api/users/current/scanned-products", ScannedProductController.getAllByUserId);
apiRouter.post("/api/users/current/scanned-products", ScannedProductController.create);
apiRouter.get("/api/users/current/scanned-products/:scannedProductId(\\d+)", ScannedProductController.get);
apiRouter.delete("/api/users/current/scanned-products/:scannedproductid(\\d+)", ScannedProductController.remove);

//Analysis API
apiRouter.get("/api/users/current/analysis", AnalysisController.get);
apiRouter.post("/api/users/current/analysis", AnalysisController.create);
apiRouter.patch("/api/users/current/analysis", AnalysisController.patch);
apiRouter.delete("/api/users/current/analysis/:date", AnalysisController.remove);