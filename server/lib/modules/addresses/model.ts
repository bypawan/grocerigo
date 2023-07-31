import * as mongoose from "mongoose";

export interface IAddress {
  _id?: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  addresses: {
    _id?: mongoose.Types.ObjectId;
    name: String;
    email: String;
    addressLine: String;
    city: String;
    state: String;
    pincode: Number;
    phone: Number;
  }[];
}
