import express, { Request, Response, Router } from "express";

interface IProductsRouter extends Router {
  getProducts?: (req: Request, res: Response) => void;
}

import {
  getProducts,
  getProductById,
  addProduct,
  removeProductById,
} from "../controllers/products-controller";

const router: IProductsRouter = express.Router();

router.get("/products", getProducts);
router.post("/product-add", addProduct);
router.get("/product/:id", getProductById);
router.delete("/product/:id", removeProductById);

export default router;
