import * as mongoose from "mongoose";

import { IWishlistItem } from "./model";
import Wishlists from "./schema";

export default class WishlistService {
  public async createWishlist(params: IWishlistItem) {
    try {
      const newWishlist = new Wishlists(params);
      const wishlist = await newWishlist.save();
      return wishlist;
    } catch (error) {
      throw error;
    }
  }

  public async findWishlist(query: any) {
    try {
      const wishlist = await Wishlists.findOne(query);
      return wishlist;
    } catch (error) {
      throw error;
    }
  }

  public async deleteWishlist(_id: mongoose.Types.ObjectId) {
    const query = { _id: _id };

    try {
      const wishlist = await Wishlists.deleteOne(query);
      return wishlist;
    } catch (error) {
      throw error;
    }
  }
}
