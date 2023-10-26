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
