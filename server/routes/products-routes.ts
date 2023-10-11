import express, { Request, Response, Router } from "express";

interface IProductsRouter extends Router {
  getProducts?: (req: Request, res: Response) => void;
}

import { getProducts } from "../controllers/products-controller";

const router: IProductsRouter = express.Router();

router.get("/products", getProducts);

export default router;
