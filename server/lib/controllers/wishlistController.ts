import * as mongoose from "mongoose";
import { Request, Response } from "express";

import {
  insufficientFields,
  mongoError,
  successResponse,
  failureResponse,
} from "@/modules/common/service";
import UserService from "@/modules/users/service";
import ProductService from "@/modules/products/service";
import WishlistService from "@/modules/wishlist/service";

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

        const wishlistId = user.wishlist;

        if (!wishlistId)
          return failureResponse("Wishlist is empty.", null, res);

        const wishlist = await this.wishlistService.findWishlist({
          _id: wishlistId,
        });

        if (!wishlist.userId.equals(user._id))
          return failureResponse("Wishlist is empty.", null, res);

        const validIds = wishlist.products.filter(
          (id: mongoose.Types.ObjectId) => mongoose.Types.ObjectId.isValid(id)
        );
        const products = await this.productService.fetchProducts(
          parseInt(req.query.page as string) || 1,
          10,
          {
            _id: { $in: validIds },
          },
          { modificationNotes: 0 }
        );

        if (products?.products.length === 0)
          return failureResponse("Wishlist is empty.", null, res);

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
      const { productId } = req.body;

      try {
        const user = await this.userService.findUser(userFilter);
        if (!user) return failureResponse("invalid user", null, res);

        try {
          new mongoose.Types.ObjectId(productId);
        } catch (error) {
          return failureResponse("Not a valid product id.", null, res);
        }

        const product = await this.productService.findProduct({
          _id: productId,
        });

        if (!product) return failureResponse("invalid product", null, res);

        try {
          if (!user.wishlist) {
            let wishlist = await this.wishlistService.createWishlist({
              userId: user._id,
              products: [product._id],
            });
            wishlist = await wishlist.save();

            user.wishlist = wishlist._id;
            await user.save();
          } else {
            const wishlist = await this.wishlistService.findWishlist({
              _id: user.wishlist,
            });

            if (wishlist.products.includes(product._id))
              return failureResponse(
                "Product is already in wishlist",
                null,
                res
              );

            wishlist.products.unshift(product._id);
            await wishlist.save();
          }
        } catch (error) {
          return mongoError(error, res);
        }

        successResponse("Product added to wishlist", null, res);
      } catch (error) {
        mongoError(error, res);
      }
    } else {
      const params = ["Product Id"];
      insufficientFields(res, params);
    }
  }

  public async removeProductFromUserWishlist(req: Request, res: Response) {
    if (req.params.id && req.params.productId) {
      const userFilter = { _id: req.params.id };
      const { productId } = req.params;

      try {
        let user = await this.userService.findUser(userFilter);
        if (!user) return failureResponse("invalid user", null, res);

        try {
          new mongoose.Types.ObjectId(productId);
        } catch (error) {
          return failureResponse("Not a valid product id.", null, res);
        }

        const product = await this.productService.findProduct({
          _id: productId,
        });

        if (!product) return failureResponse("invalid product", null, res);

        let wishlist = await this.wishlistService.findWishlist({
          _id: user.wishlist,
        });

        if (!wishlist)
          return failureResponse("User have no wishlist", null, res);

        const index = wishlist.products.indexOf(product._id);

        if (index === -1)
          return failureResponse("Product not found in wishlist", null, res);

        wishlist.products.splice(index, 1);
        wishlist = await wishlist.save();

        if (wishlist.products.length === 0) {
          this.wishlistService.deleteWishlist(wishlist._id);
          user.wishlist = null;
          await user.save();
        }

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
