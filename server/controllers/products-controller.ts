import { Request, Response, Router } from "express";
import fs from "fs/promises";
import path from "path";

const productsPath = path.join(__dirname, "..", "data", "products.json");

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await fs.readFile(productsPath, "utf8");
    res.json(JSON.parse(products));
  } catch (err) {
    console.log(err);
  }
};
