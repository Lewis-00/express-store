import { Request, Response, Router } from "express";
import { ProductsModel } from "../models/products-model";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await ProductsModel.getAllProducts();
    return res.status(200).json(products);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const productId = req.params.id;
  try {
    const [product]: any = await ProductsModel.getProductById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });
    return res.status(200).json({ product });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const addProduct = async (req: Request, res: Response) => {
  const { product_name, description, price, imageUrl } = req.body;
  try {
    const newProduct = new ProductsModel(
      product_name,
      description,
      price,
      imageUrl
    );
    await newProduct.addProduct();
    return res
      .status(200)
      .json({ message: "Product added" })
      .redirect("/products");
  } catch (err) {
    console.log(err);
  }
};
