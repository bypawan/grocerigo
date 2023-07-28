import { IWishlistItem } from "./model";
import Wishlist from "./schema";

export default class WishlistService {
  public async createWishlist(params: IWishlistItem) {
    try {
      const newWishlist = new Wishlist(params);
      const wishlist = await newWishlist.save();
      return wishlist;
    } catch (error) {
      throw error;
    }
  }

  //   public async fetchUsers(query?: any) {
  //     try {
  //       const users = await Users.find(query);
  //       return users;
  //     } catch (error) {
  //       throw error;
  //     }
  //   }

  public async findWishlist(query: any) {
    try {
      const wishlist = await Wishlist.findOne(query);
      return wishlist;
    } catch (error) {
      throw error;
    }
  }

  //   public async updateUser(userParams: IUser) {
  //     const query = { _id: userParams._id };

  //     try {
  //       const user = await Users.findOneAndUpdate(query, userParams, {
  //         new: true,
  //       });

  //       return user;
  //     } catch (error) {
  //       throw error;
  //     }
  //   }

  //   public async deleteUser(_id: String) {
  //     const query = { _id: _id };

  //     try {
  //       const user = await Users.deleteOne(query);
  //       return user;
  //     } catch (error) {
  //       throw error;
  //     }
  //   }
}
