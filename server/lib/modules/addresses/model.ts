import * as mongoose from "mongoose";

export interface IAddress {
  id?: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  addresses: {
    name: String;
    email: String;
    addressLine: String;
    city: String;
    state: String;
    pincode: Number;
    phone: Number;
  }[];
}
