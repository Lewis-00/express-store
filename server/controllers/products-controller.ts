import { Request, Response, Router } from "express";
import { ProductsModel } from "../models/products-model";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await ProductsModel.getAllProducts();
    return res.status(200).json(products);
  } catch (err) {
    console.log(err);
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const productId = req.params.id;
  try {
    const [product]: any = await ProductsModel.getProductById(productId);
    console.log(product);
    if (!product) return res.status(404).json({ message: "Product not found" });
    return res.status(200).json({ product });
  } catch (err) {
    console.log(err);
  }
};
