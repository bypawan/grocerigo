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
import CartService from "@/modules/carts/service";

export class CartController {
  private userService: UserService = new UserService();
  private productService: ProductService = new ProductService();
  private cartService: CartService = new CartService();

  public async getUserCart(req: Request, res: Response) {
    if (req.params.id) {
      const userFilter = { _id: req.params.id };

      try {
        const user = await this.userService.findUser(userFilter);

        if (!user) return failureResponse("invalid user", null, res);

        const cartId = user.cart;

        if (!cartId) return failureResponse("Cart is empty.", null, res);

        const cart = await this.cartService.findCart({
          _id: cartId,
        });

        if (!cart.userId.equals(user._id))
          return failureResponse("Cart is empty.", null, res);

        const validIds = cart.products
          .filter(
            (product: {
              productId: mongoose.Types.ObjectId;
              quantity: number;
            }) => mongoose.Types.ObjectId.isValid(product.productId)
          )
          .map(
            (product: {
              productId: mongoose.Types.ObjectId;
              quantity: number;
            }) => product.productId
          );
        const products = await this.productService.fetchProducts(
          parseInt(req.query.page as string) || 1,
          10,
          {
            _id: { $in: validIds },
          },
          { modificationNotes: 0 }
        );

        const cartProducts = products.products.map((product) => {
          const item = cart.products.find(
            (item: { productId: mongoose.Types.ObjectId; quantity: number }) =>
              product._id.equals(item.productId)
          );

          if (item)
            return {
              _id: product._id,
              name: product.name,
              price: product.price,
              quantity: item.quantity,
            };
        });

        const validCart = {
          totalProducts: products.totalProducts,
          page: products.page,
          totalPages: products.totalPages,
          products: cartProducts,
        };

        if (validCart?.products.length === 0)
          return failureResponse("Cart is empty.", null, res);

        return successResponse("User cart is retrieved.", validCart, res);
      } catch (error) {
        mongoError(error, res);
      }
    } else {
      const params = ["user id"];
      insufficientFields(res, params);
    }
  }

  public async addProductToUserCart(req: Request, res: Response) {
    if (req.params.id && req.body.productId && req.body.quantity) {
      const userFilter = { _id: req.params.id };
      const { productId, quantity } = req.body;

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
          if (!user.cart) {
            let cart = await this.cartService.createCart({
              userId: user._id,
              products: [
                {
                  productId: product._id,
                  quantity: quantity,
                },
              ],
            });
            cart = await cart.save();

            user.cart = cart._id;
            await user.save();
          } else {
            const cart = await this.cartService.findCart({ _id: user.cart });

            if (
              cart.products.some((cartProduct) =>
                cartProduct.productId.equals(product._id)
              )
            ) {
              cart.products.forEach((cartProduct) => {
                if (cartProduct.productId.equals(product._id)) {
                  cartProduct.quantity = quantity;
                }
              });

              await cart.save();
              return successResponse("Product updated inside cart", null, res);
            }

            cart.products.unshift({
              productId: product._id,
              quantity: quantity,
            });
            await cart.save();
          }
        } catch (error) {
          return mongoError(error, res);
        }

        successResponse("Product added to cart", null, res);
      } catch (error) {
        console.log(error);
        mongoError(error, res);
      }
    } else {
      const params = ["Product Id", "Quantity"];
      insufficientFields(res, params);
    }
  }

  public async removeProductFromUserCart(req: Request, res: Response) {
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

        let cart = await this.cartService.findCart({
          _id: user.cart,
        });

        if (!cart) return failureResponse("User have no cart", null, res);

        const index = cart.products.findIndex((cartProduct) =>
          cartProduct.productId.equals(product._id)
        );

        if (index === -1)
          return failureResponse("Product not found in cart", null, res);

        cart.products.splice(index, 1);
        cart = await cart.save();

        if (cart.products.length === 0) {
          this.cartService.deleteCart(cart._id);
          user.cart = null;
          await user.save();
        }

        successResponse("Product removed from cart", null, res);
      } catch (error) {
        mongoError(error, res);
      }
    } else {
      const params = ["Product Id"];
      insufficientFields(res, params);
    }
  }
}
