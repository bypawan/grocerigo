import { IProduct } from "./model";
import Products from "./schema";

export default class ProductService {
  public async createProduct(product_params: IProduct) {
    try {
      const newProduct = new Products(product_params);
      const product_data = await newProduct.save();

      return product_data;
    } catch (error) {
      throw error;
    }
  }
}
