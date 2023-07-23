import * as jwt from "jsonwebtoken";
import { Request, Response } from "express";

import {
  failureResponse,
  insufficientParameters,
  mongoError,
  successResponse,
} from "@/modules/common/service";
import { IProduct } from "@/modules/products/model";
import Products from "@/modules/products/schema";
import ProductService from "@/modules/products/service";
import { DecodedUser } from "@/config/middleware";
import { response_status_codes } from "@/modules/common/model";

export class ProductController {
  private product_service: ProductService = new ProductService();

  public async create_product(req: Request, res: Response) {
    if (req.body.name && req.body.description && req.body.price) {
      const product_params: IProduct = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: [req.body.category ? req.body.category : "NOT_ASSIGNED"],
        modification_notes: [
          {
            modified_on: new Date(Date.now()),
            modified_by: null,
            modification_note: "New product created.",
          },
        ],
      };

      try {
        const product_data = await this.product_service.createProduct(
          product_params
        );

        const responseData = {
          _id: product_data.id,
          name: product_data.name,
          description: product_data.description,
          price: product_data.price,
          category: product_data.category,
        };

        successResponse("Product created successfully.", responseData, res);
      } catch (error) {
        mongoError(error, res);
      }
    } else {
      insufficientParameters(res);
    }
  }

  public async get_products(req: Request, res: Response) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      try {
        const products = await Products.find({}, { modification_notes: 0 });

        if (products.length >= 1) {
          return successResponse("Get products successful.", products, res);
        } else {
          return failureResponse("NO products found.", null, res);
        }
      } catch (error) {
        return mongoError(error, res);
      }
    }

    try {
      let products: IProduct[] = [];
      const user = jwt.verify(token, "SuperSecret") as DecodedUser;
      const userRole = user.role;

      if (userRole === "ADMIN") products = await Products.find({});
      else products = await Products.find({}, { modification_notes: 0 });

      if (products.length >= 1) {
        successResponse("Get products successful.", products, res);
      } else {
        failureResponse("NO products found.", null, res);
      }
    } catch (error) {
      return res.status(response_status_codes.Unauthorized).json({
        STATUS: "SUCCESS",
        MESSAGE: "Unauthorized. Invalid token.",
        DATA: null,
      });
    }
  }
}
