import db from "../utils/db";
export class ProductsModel {
  private product_name: string;
  private description: string;
  private price: number;
  private imageUrl: string;

  constructor(
    product_name: string,
    description: string,
    price: number,
    imageUrl: string
  ) {
    this.product_name = product_name;
    this.description = description;
    this.price = price;
    this.imageUrl = imageUrl;
  }

  static async getAllProducts() {
    try {
      const [rows] = await db.execute("SELECT * FROM products");
      return rows;
    } catch (e) {
      console.log(e);
      throw new Error("Errore durante il recupero dei prodotti");
    }
  }

  static async getProductById(id: string) {
    try {
      const [rows] = await db.execute("SELECT * FROM products WHERE id=?", [
        id,
      ]);
      return rows;
    } catch (e) {
      console.log(e);
      throw new Error("Errore durante il recupero del prodotto");
    }
  }

  addProduct() {
    return db.execute(
      "INSERT INTO products (product_name, description, price, imageUrl) VALUES (?, ?, ?, ?)",
      [this.product_name, this.description, this.price, this.imageUrl]
    );
  }

  static async removeProductById(id: string) {
    try {
      return db.execute("DELETE FROM products WHERE id=?", [id]);
    } catch (e) {
      return e;
    }
  }
}
