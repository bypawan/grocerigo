import { IProduct } from "./model";
import Products from "./schema";

export default class ProductService {
  public async createProduct(productParams: IProduct) {
    try {
      const newProduct = new Products(productParams);
      const product = await newProduct.save();

      return product;
    } catch (error) {
      throw error;
    }
  }

  public async getProducts(
    page: number,
    limit: number,
    query?: any,
    projection?: any
  ) {
    try {
      const totalCount = await Products.countDocuments(query);
      const products = await Products.find(query, projection)
        .skip((page - 1) * limit)
        .limit(limit);

      return { ...products, page: page, totalCount: totalCount };
    } catch (error) {
      throw error;
    }
  }

  public async filterProduct(query: any, exclude?: any) {
    try {
      const product: IProduct = await Products.findOne(query, exclude);

      return product;
    } catch (error) {
      throw error;
    }
  }

  public async updateProduct(productParams: IProduct) {
    const query = { _id: productParams._id };

    try {
      const product = await Products.findOneAndUpdate(query, productParams, {
        new: true,
      });
      return product;
    } catch (error) {
      throw error;
    }
  }

  public async deleteProduct(_id: String) {
    const query = { _id: _id };

    try {
      const product = await Products.deleteOne(query);
      return product;
    } catch (error) {
      throw error;
    }
  }
}
