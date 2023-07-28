import * as mongoose from "mongoose";

export interface IWishlistItem {
  _id?: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  products: mongoose.Types.ObjectId[];
}
