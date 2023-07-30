import * as jwt from "jsonwebtoken";
import { Request, Response } from "express";

import {
  failureResponse,
  insufficientFields,
  mongoError,
  successResponse,
} from "@/modules/common/service";
import { IProduct } from "@/modules/products/model";
import { DecodedUser } from "@/config/middleware";
import { responseStatusCodes } from "@/modules/common/model";
import AddressService from "@/modules/addresses/service";
import UserService from "@/modules/users/service";
import { IAddress } from "@/modules/addresses/model";

export class AddressController {
  private addressService: AddressService = new AddressService();
  private userService: UserService = new UserService();

  public async createAddress(req: Request, res: Response) {
    const requiredFields = [
      "name",
      "email",
      "addressLine",
      "city",
      "state",
      "pincode",
      "phone",
    ];
    const missingFields = requiredFields.filter(
      (field) => !(field in req.body)
    );

    if (missingFields.length === 0 && req.params.id) {
      const userFilter = { _id: req.params.id };
      let user = await this.userService.findUser(userFilter);

      if (!user) return failureResponse("invalid user", null, res);
      const { name, email, addressLine, state, city, pincode, phone } =
        req.body;

      try {
        if (!user.address) {
          const addressPrams: IAddress = {
            userId: user._id,
            addresses: [
              {
                name,
                email,
                addressLine,
                state,
                city,
                pincode,
                phone,
              },
            ],
          };

          const address = await this.addressService.createAddress(addressPrams);
          user.address = address._id;
          await user.save();

          successResponse("Address added successfully.", null, res);
        } else {
          let address = await this.addressService.fetchAddress({
            _id: user.address,
          });

          const addressPrams = {
            name,
            email,
            addressLine,
            state,
            city,
            pincode,
            phone,
          };

          address.addresses.unshift(addressPrams);
          await address.save();

          successResponse("Address added successfully.", null, res);
        }
      } catch (error) {
        return mongoError(error, res);
      }
    } else {
      insufficientFields(res, missingFields);
    }
  }

  public async getUserAddress(req: Request, res: Response) {
    if (req.params.id) {
      const userFilter = { _id: req.params.id };

      try {
        const user = await this.userService.findUser(userFilter);

        if (!user) return failureResponse("invalid user", null, res);

        const addressId = user.address;

        if (!addressId) return failureResponse("No address saved.", null, res);

        const address = await this.addressService.fetchAddress({
          _id: addressId,
        });

        if (!address.userId.equals(user._id))
          return failureResponse("No address saved.", null, res);

        if (address?.addresses.length === 0)
          return failureResponse("No address saved.", null, res);

        return successResponse("User address is retrieved.", address, res);
      } catch (error) {
        mongoError(error, res);
      }
    } else {
      const params = ["user id"];
      insufficientFields(res, params);
    }
  }
}
