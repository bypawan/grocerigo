import * as mongoose from "mongoose";

export interface ICartItem {
  _id?: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  products: { productId: mongoose.Types.ObjectId; quantity: number }[];
}
