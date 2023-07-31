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

  public async fetchProducts(
    page: number,
    limit: number,
    query?: any,
    projection?: any
  ): Promise<{
    totalProducts: number;
    page: number;
    totalPages: number;
    products: IProduct[];
  }> {
    try {
      const totalProducts = await Products.countDocuments(query);
      const products = await Products.find(query, projection)
        .skip((page - 1) * limit)
        .limit(limit);

      return {
        totalProducts: totalProducts,
        page: page,
        totalPages: Math.ceil(totalProducts / limit),
        products: products,
      };
    } catch (error) {
      throw error;
    }
  }

  public async findProduct(query: any, exclude?: any) {
    try {
      const product: IProduct | null = await Products.findOne(query, exclude);

      return product;
    } catch (error) {
      throw error;
    }
  }

  public async fetchDistinctFieldValues(field: string) {
    try {
      const values = await Products.distinct(field);

      return values;
    } catch (error) {
      throw error;
    }
  }

  public async updateProduct(productParams: IProduct) {
    const query = { _id: productParams._id };

    try {
      const product = await Products.findOneAndUpdate(query, productParams, {
        new: true,
        runValidators: true,
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
