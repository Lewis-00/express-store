import db from "../utils/db";
export class ProductsModel {
  static async getAllProducts() {
    try {
      const [rows] = await db.execute("SELECT * FROM products");
      return rows;
    } catch (e) {
      console.log(e);
      throw new Error("Errore durante il recupero dei prodotti");
    }
  }
}
