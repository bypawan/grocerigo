import * as mongoose from "mongoose";

import { ICartItem } from "./model";
import Cart from "./schema";

export default class CartService {
  public async createCart(params: ICartItem) {
    try {
      const newCart = new Cart(params);
      const cart = await newCart.save();
      return cart;
    } catch (error) {
      throw error;
    }
  }

  public async findCart(query: any) {
    try {
      const cart = await Cart.findOne(query);
      return cart;
    } catch (error) {
      throw error;
    }
  }

  public async deleteCart(_id: mongoose.Types.ObjectId) {
    const query = { _id: _id };

    try {
      const cart = await Cart.deleteOne(query);
      return cart;
    } catch (error) {
      throw error;
    }
  }
}
