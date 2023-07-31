import * as mongoose from "mongoose";

import { IAddress } from "./model";
import Addresses from "./schema";

export default class AddressService {
  public async createAddress(addressParams: IAddress) {
    try {
      const newAddress = new Addresses(addressParams);
      const address = await newAddress.save();

      return address;
    } catch (error) {
      throw error;
    }
  }

  public async findAddress(query: any, projection?: any) {
    try {
      const address = await Addresses.findOne(query, projection);
      return address;
    } catch (error) {
      throw error;
    }
  }

  public async updateAddress(query: any, addressParams: any) {
    try {
      const address = await Addresses.findOneAndUpdate(query, addressParams, {
        new: true,
        runValidators: true,
      });
      return address;
    } catch (error) {
      throw error;
    }
  }

  public async deleteAddress(_id: mongoose.Types.ObjectId) {
    const query = { _id: _id };

    try {
      const address = await Addresses.deleteOne(query);
      return address;
    } catch (error) {
      throw error;
    }
  }
}
