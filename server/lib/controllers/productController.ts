import * as jwt from "jsonwebtoken";
import { Request, Response } from "express";

import {
  failureResponse,
  insufficientFields,
  mongoError,
  successResponse,
} from "@/modules/common/service";
import { IProduct } from "@/modules/products/model";
import ProductService from "@/modules/products/service";
import { DecodedUser } from "@/config/middleware";
import { responseStatusCodes } from "@/modules/common/model";

export class ProductController {
  private productService: ProductService = new ProductService();

  public async createProduct(req: Request, res: Response) {
    const requiredFields = ["name", "description", "price"];
    const missingFields = requiredFields.filter(
      (field) => !(field in req.body)
    );

    if (missingFields.length === 0) {
      const token = req.headers.authorization?.split(" ")[1];
      let user: { _id: string | undefined; role: string | undefined };

      try {
        const decodedToken = jwt.verify(
          token as string,
          "SuperSecret"
        ) as unknown;

        user = {
          _id: (decodedToken as { _id: string | undefined })._id,
          role: (decodedToken as { role: string | undefined }).role,
        };
      } catch (error) {
        user = { _id: undefined, role: undefined };
        return failureResponse("JWT verification error", null, res);
      }

      const { name, description, price, categories } = req.body;

      const productParams: IProduct = {
        name,
        description,
        price,
        categories: categories ? [categories.toLowerCase()] : [],
        modificationNotes: [
          {
            modifiedOn: new Date(Date.now()),
            modifiedBy: user.role,
            modificationNote: "New product created.",
          },
        ],
      };

      try {
        const product = await this.productService.createProduct(productParams);

        const responseData = {
          _id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          categories: product.categories,
        };

        successResponse("Product created successfully.", responseData, res);
      } catch (error) {
        mongoError(error, res);
      }
    } else {
      insufficientFields(res, missingFields);
    }
  }

  public async getProducts(req: Request, res: Response) {
    const token = req.headers.authorization?.split(" ")[1];
    let products: {
      totalProducts: number;
      page: number;
      totalPages: number;
      products: IProduct[];
    };
    const { category, page } = req.query;
    const categoryFilter = { categories: { $in: [category] } };

    if (!token) {
      try {
        products = await this.productService.fetchProducts(
          parseInt(page as string) || 1,
          10,
          category ? categoryFilter : {},
          { modificationNotes: 0 }
        );
      } catch (error) {
        return mongoError(error, res);
      }
    }

    if (token) {
      try {
        const user = jwt.verify(token, "SuperSecret") as DecodedUser;
        const userRole = user.role;

        if (userRole === "ADMIN")
          products = await this.productService.fetchProducts(
            parseInt(page as string) || 1,
            10,
            category ? categoryFilter : {}
          );
        else
          products = await this.productService.fetchProducts(
            parseInt(page as string) || 1,
            10,
            category ? categoryFilter : {},
            { modificationNotes: 0 }
          );
      } catch (error) {
        return res.status(responseStatusCodes.Unauthorized).json({
          STATUS: "SUCCESS",
          MESSAGE: "Unauthorized. Invalid token.",
          DATA: null,
        });
      }
    }

    if (products?.products.length === 0)
      return failureResponse("NO products found.", null, res);

    return successResponse("Get products successful.", products, res);
  }

  public async getProduct(req: Request, res: Response) {
    if (req.params.id) {
      const productFilter = { _id: req.params.id };
      const token = req.headers.authorization?.split(" ")[1];
      let product: IProduct | null;

      if (!token) {
        try {
          product = await this.productService.findProduct(productFilter, {
            modificationNotes: 0,
          });

          if (!product) return failureResponse("Invalid product", null, res);

          return successResponse("Get product successful.", product, res);
        } catch (error) {
          mongoError(error, res);
        }
      }

      if (token) {
        try {
          const user = jwt.verify(token, "SuperSecret") as DecodedUser;
          const userRole = user.role;

          if (userRole === "ADMIN")
            product = await this.productService.findProduct(productFilter);
          else
            product = await this.productService.findProduct(productFilter, {
              modificationNotes: 0,
            });

          if (!product) return failureResponse("Invalid product", null, res);

          return successResponse("Get product successful.", product, res);
        } catch (error) {
          mongoError(error, res);
        }
      }
    } else {
      insufficientFields(res);
    }
  }

  public async searchProduct(req: Request, res: Response) {
    const { q: keyword, page } = req.query;

    if (keyword) {
      try {
        const query = {
          name: { $regex: keyword, $options: "i" },
        };

        const products = await this.productService.fetchProducts(
          parseInt(page as string) || 1,
          10,
          query,
          { modificationNotes: 0 }
        );

        if (products?.products.length === 0)
          return failureResponse("NO products found.", null, res);

        return successResponse("Get products successful.", products, res);
      } catch (error) {
        mongoError(error, res);
      }
    } else {
      const params = ["search term"];
      insufficientFields(res, params);
    }
  }

  public async getDistinctFieldValues(req: Request, res: Response) {
    try {
      const allowedFields = ["categories"];
      const requestedField = req.query.field as string;

      if (!requestedField || !allowedFields.includes(requestedField))
        return failureResponse(
          "Invalid or disallowed field request.",
          null,
          res
        );

      const values = await this.productService.fetchDistinctFieldValues(
        requestedField
      );

      successResponse(
        "Distinct field values retrieved successfully.",
        values,
        res
      );
    } catch (error) {
      mongoError(error, res);
    }
  }

  public async updateProduct(req: Request, res: Response) {
    const { ...updatedFields } = req.body;

    if (req.params.id && Object.keys(updatedFields).length >= 1) {
      const token = req.headers.authorization?.split(" ")[1];
      let user: { _id: string | undefined; role: string | undefined };

      try {
        const decodedToken = jwt.verify(
          token as string,
          "SuperSecret"
        ) as unknown;

        user = {
          _id: (decodedToken as { _id: string | undefined })._id,
          role: (decodedToken as { role: string | undefined }).role,
        };
      } catch (error) {
        user = { _id: undefined, role: undefined };
        return failureResponse("JWT verification error", null, res);
      }

      try {
        const productFilter = { _id: req.params.id };
        const product = await this.productService.findProduct(productFilter);

        if (!product) return failureResponse("Invalid product", null, res);

        product.modificationNotes.unshift({
          modifiedOn: new Date(Date.now()),
          modifiedBy: user.role,
          modificationNote: "Product data updated",
        });

        const isAlreadyInCategories =
          product.categories &&
          req.body.categories &&
          product.categories.length >= 1 &&
          product.categories.some(
            (el) => el.toLowerCase() === req.body.categories.toLowerCase()
          );

        if (!isAlreadyInCategories && isAlreadyInCategories !== undefined)
          product.categories &&
            product.categories.push(req.body.categories.toLowerCase());

        const productParams: IProduct = {
          _id: product._id,
          name: req.body?.name ?? product.name,
          description: req.body?.description ?? product.description,
          price: req.body?.price ?? product.price,
          categories: product.categories,
          modificationNotes: product.modificationNotes,
        };

        try {
          const product = await this.productService.updateProduct(
            productParams
          );

          successResponse("update user successful", product, res);
        } catch (err) {
          mongoError(err, res);
        }
      } catch (error) {
        console.log(error);

        mongoError(error, res);
      }
    } else {
      insufficientFields(res);
    }
  }

  public async deleteProduct(req: Request, res: Response) {
    if (req.params.id) {
      try {
        const deleteDetails = await this.productService.deleteProduct(
          req.params.id
        );

        if (deleteDetails.deletedCount === 0)
          return failureResponse("Invalid product", null, res);

        successResponse("delete product successful", null, res);
      } catch (error) {
        mongoError(error, res);
      }
    } else {
      insufficientFields(res);
    }
  }
}
