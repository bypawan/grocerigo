import * as jwt from "jsonwebtoken";
import * as mongoose from "mongoose";
import { hash, compare } from "bcrypt";
import { Request, Response } from "express";

import {
  insufficientFields,
  mongoError,
  successResponse,
  failureResponse,
} from "@/modules/common/service";
import { IUser } from "@/modules/users/model";
import UserService from "@/modules/users/service";
import ProductService from "@/modules/products/service";
import WishlistService from "@/modules/wishlist/service";

import Products from "@/modules/products/schema";

export class WishlistController {
  private userService: UserService = new UserService();
  private productService: ProductService = new ProductService();
  private wishlistService: WishlistService = new WishlistService();

  public async getUserWishlist(req: Request, res: Response) {
    if (req.params.id) {
      const userFilter = { _id: req.params.id };

      try {
        const user = await this.userService.findUser(userFilter);

        if (!user) return failureResponse("invalid user", null, res);

        const wishlistProductIds = user.wishlist;

        if (wishlistProductIds.length === 0)
          return failureResponse("Wishlist is empty.", null, res);

        const validIds = wishlistProductIds
          .map((id) => {
            try {
              return new mongoose.Types.ObjectId(id);
            } catch (error) {
              return null;
            }
          })
          .filter((id) => id !== null);
        const query = { _id: { $in: validIds } };
        const page = parseInt(req.query.page as string) || 1;

        const products = await this.productService.fetchProducts(
          page,
          10,
          query,
          {
            modificationNotes: 0,
          }
        );

        return successResponse("User wishlist is retrieved.", products, res);
      } catch (error) {
        mongoError(error, res);
      }
    } else {
      const params = ["user id"];
      insufficientFields(res, params);
    }
  }

  public async addProductToUserWishlist(req: Request, res: Response) {
    if (req.params.id && req.body.productId) {
      const userFilter = { _id: req.params.id };

      try {
        const user = await this.userService.findUser(userFilter);
        const product = await this.productService.findProduct({
          _id: req.body.productId,
        });

        if (!user) return failureResponse("invalid user", null, res);
        if (!product) return failureResponse("invalid product", null, res);

        const wishlistProductId = req.body.productId;

        try {
          new mongoose.Types.ObjectId(wishlistProductId);
        } catch (error) {
          failureResponse("Not a valid product id.", null, res);
          return null;
        }

        if (user.wishlist?.includes(wishlistProductId))
          return failureResponse("Product is already in wishlist", null, res);

        user.wishlist.unshift(wishlistProductId);
        await user.save();

        successResponse("Product added to wishlist", null, res);
      } catch (error) {
        console.log(error);
        mongoError(error, res);
      }
    } else {
      const params = ["Product Id"];
      insufficientFields(res, params);
    }
  }

  public async removeProductToUserWishlist(req: Request, res: Response) {
    if (req.params.id && req.params.productId) {
      const userFilter = { _id: req.params.id };

      try {
        const user = await this.userService.findUser(userFilter);

        if (!user) return failureResponse("invalid user", null, res);

        const wishlistProductId = req.params.productId;
        let validId: mongoose.Types.ObjectId;

        try {
          validId = new mongoose.Types.ObjectId(wishlistProductId);
        } catch (error) {
          failureResponse("Not a valid product id.", null, res);
          return null;
        }

        const index = user.wishlist.indexOf(validId);

        if (index === -1)
          return failureResponse("Product not found in wishlist", null, res);

        user.wishlist.splice(index, 1);
        await user.save();

        successResponse("Product removed from wishlist", null, res);
      } catch (error) {
        console.log(error);
        mongoError(error, res);
      }
    } else {
      const params = ["Product Id"];
      insufficientFields(res, params);
    }
  }
}
