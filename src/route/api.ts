import express from 'express';
import { ProductController } from '../controller/product-controller';
import { authMiddleware } from '../middleware/auth-middleware';
import { UserController } from '../controller/user-controller';
import { ArticleController } from '../controller/article-contoller';

export const apiRouter =  express.Router();
apiRouter.use(authMiddleware)

apiRouter.get("/api/users/current", UserController.get)
apiRouter.patch("/api/users/current", UserController.update)

apiRouter.get("/api/articles", ArticleController.getAll)
apiRouter.get("/api/articles/:articleId(\\d+)", ArticleController.get)

//Product API
apiRouter.post("/api/products", ProductController.create);
apiRouter.get("/api/products", ProductController.get); //can use params id or code or name
apiRouter.patch("/api/products", ProductController.update)
apiRouter.delete("/api/products", ProductController.remove)