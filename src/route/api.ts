import express from 'express';
import { ProductController } from '../controller/product-controller';
import { authMiddleware } from '../middleware/auth-middleware';
import { UserController } from '../controller/user-controller';
import { RecommendationController } from '../controller/recommendations-controller';
import { ScannedProductController } from '../controller/scanned-product-controller';
import { ArticleController } from '../controller/article-controller';
import { UserProfileController } from '../controller/user-profile-controller';

export const apiRouter =  express.Router();
apiRouter.use(authMiddleware)

apiRouter.get("/api/users/current", UserController.get)
apiRouter.patch("/api/users/current", UserController.update)

apiRouter.get("/api/users/current/user-profile", UserProfileController.get)
apiRouter.patch("/api/users/current/user-profile", UserProfileController.update)

apiRouter.get("/api/articles", ArticleController.getAll)
apiRouter.get("/api/articles/:articleId(\\d+)", ArticleController.get)

//Product API
apiRouter.post("/api/products", ProductController.create);
apiRouter.get("/api/products/:productId(\\d+)", ProductController.get);
apiRouter.get("/api/products", ProductController.getAll);
apiRouter.patch("/api/products", ProductController.update);
apiRouter.delete("/api/products/:productId(\\d+)", ProductController.remove);

//Recommendations API
apiRouter.get("/api/products/:productId(\\d+)/recommendations", RecommendationController.get);
apiRouter.post("/api/products/:productId(\\d+)/recommendations", RecommendationController.create);

//Scanned Products API
apiRouter.get("/api/scanned-products", ScannedProductController.getAll);
apiRouter.get("/api/users/:userId(\\w+)/scanned-products", ScannedProductController.getAllByUserId);
apiRouter.post("/api/users/:userId(\\w+)/scanned-products", ScannedProductController.create);
apiRouter.get("/api/users/:userId(\\w+)/scanned-products/:scannedProductId(\\d+)", ScannedProductController.get);
apiRouter.delete("/api/users/:userId(\\w+)/scanned-products/:scannedproductid(\\d+)", ScannedProductController.remove);