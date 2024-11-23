import express from 'express';
import { ProductController } from '../controller/product-controller';

export const apiRouter =  express.Router();

//Product API
apiRouter.post("/api/products", ProductController.create);
apiRouter.get("/api/products", ProductController.get); //can use params id or code or name
apiRouter.patch("/api/products", ProductController.update)
apiRouter.delete("/api/products", ProductController.remove)