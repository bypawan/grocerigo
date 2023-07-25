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

import Products from "@/modules/products/schema";

export class ProductController {
  private productService: ProductService = new ProductService();

  public async createProduct(req: Request, res: Response) {
    const requiredFields = ["name", "description", "price"];
    const missingFields = requiredFields.filter(
      (field) => !(field in req.body)
    );

    if (missingFields.length === 0) {
      const { name, description, price, categories } = req.body;

      const productParams: IProduct = {
        name,
        description,
        price,
        categories: [categories ? categories.toLowerCase() : "all"],
        modificationNotes: [
          {
            modifiedOn: new Date(Date.now()),
            modifiedBy: null,
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
    let products = [];
    const { category, page } = req.query;

     products = await this.productService.getProducts(
      parseInt(page as string) || 1,
      10,
      category
        ? {
            categories: { $in: [category] },
          }
        : {}
    );

    console.log(products);

    return;

    // if (!token) {
    //   try {
    //     products = await this.productService.getProducts(
    //       category
    //         ? {
    //             categories: { $in: [category] },
    //           }
    //         : {},
    //       { modificationNotes: 0 }
    //     );
    //   } catch (error) {
    //     return mongoError(error, res);
    //   }
    // }

    // if (token) {
    //   try {
    //     const user = jwt.verify(token, "SuperSecret") as DecodedUser;
    //     const userRole = user.role;

    //     if (userRole === "ADMIN")
    //       products = await this.productService.getProducts(
    //         req.query.category
    //           ? {
    //               categories: { $in: [req.query.category] },
    //             }
    //           : {}
    //       );
    //     else
    //       products = await this.productService.getProducts(
    //         req.query.category
    //           ? {
    //               categories: { $in: [req.query.category] },
    //             }
    //           : {},
    //         { modificationNotes: 0 }
    //       );
    //   } catch (error) {
    //     return res.status(responseStatusCodes.Unauthorized).json({
    //       STATUS: "SUCCESS",
    //       MESSAGE: "Unauthorized. Invalid token.",
    //       DATA: null,
    //     });
    //   }
    // }

    if (products.length === 0)
      return failureResponse("NO products found.", null, res);

    return successResponse("Get products successful.", products, res);
  }

  public async getProduct(req: Request, res: Response) {
    if (req.params.id) {
      const productFilter = { _id: req.params.id };
      const token = req.headers.authorization?.split(" ")[1];
      let product: IProduct;

      if (!token) {
        try {
          product = await this.productService.filterProduct(productFilter, {
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
            product = await this.productService.filterProduct(productFilter);
          else
            product = await this.productService.filterProduct(productFilter, {
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

  public async updateProduct(req: Request, res: Response) {
    const { ...updatedFields } = req.body;

    if (req.params.id && Object.keys(updatedFields).length >= 1) {
      try {
        const productFilter = { _id: req.params.id };
        const product = await this.productService.filterProduct(productFilter);

        if (!product) return failureResponse("Invalid product", null, res);

        product.modificationNotes.unshift({
          modifiedOn: new Date(Date.now()),
          modifiedBy: null,
          modificationNote: "Product data updated",
        });

        const isAlreadyInCategories = product.categories.some(
          (el) => el.toLowerCase() === req.body.categories.toLowerCase()
        );

        if (!isAlreadyInCategories)
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
