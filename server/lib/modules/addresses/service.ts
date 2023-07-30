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

  public async fetchAddress(query: any) {
    try {
      const address = await Addresses.findOne(query);
      return address;
    } catch (error) {
      throw error;
    }
  }

  // public async deleteCart(_id: mongoose.Types.ObjectId) {
  //   const query = { _id: _id };

  //   try {
  //     const cart = await Carts.deleteOne(query);
  //     return cart;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}
