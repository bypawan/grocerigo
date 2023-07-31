import { Request, Response } from "express";

import {
  failureResponse,
  insufficientFields,
  mongoError,
  successResponse,
} from "@/modules/common/service";

import AddressService from "@/modules/addresses/service";
import UserService from "@/modules/users/service";
import { IAddress } from "@/modules/addresses/model";
import mongoose from "mongoose";

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
          let address = await this.addressService.findAddress({
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

  public async getUserAddresses(req: Request, res: Response) {
    if (req.params.id) {
      const userFilter = { _id: req.params.id };

      try {
        const user = await this.userService.findUser(userFilter);

        if (!user) return failureResponse("invalid user", null, res);

        const addressId = user.address;

        if (!addressId) return failureResponse("No address saved.", null, res);

        const address = await this.addressService.findAddress({
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

  public async getUserAddress(req: Request, res: Response) {
    const { id, addressId } = req.params;

    if (id && addressId) {
      const userFilter = { _id: id };

      try {
        const user = await this.userService.findUser(userFilter);

        if (!user) return failureResponse("invalid user", null, res);
        if (!user.address)
          return failureResponse("No address saved.", null, res);

        try {
          new mongoose.Types.ObjectId(addressId);
        } catch (error) {
          return failureResponse("Not a valid address id.", null, res);
        }

        const address = await this.addressService.findAddress(
          { _id: user.address },
          {
            addresses: {
              $elemMatch: {
                _id: new mongoose.Types.ObjectId(addressId),
              },
            },
          }
        );

        if (address?.addresses.length === 0)
          return failureResponse("No address saved.", null, res);

        return successResponse("User address is retrieved.", address, res);
      } catch (error) {
        console.log(error);
        mongoError(error, res);
      }
    } else {
      const params = ["User id", "Address id"];
      insufficientFields(res, params);
    }
  }

  public async updateUserAddress(req: Request, res: Response) {
    const { id, addressId } = req.params;
    const { ...updatedFields } = req.body;

    if (Object.keys(updatedFields).length >= 1 && id && addressId) {
      const userFilter = { _id: id };

      try {
        const user = await this.userService.findUser(userFilter);

        if (!user) return failureResponse("invalid user", null, res);
        if (!user.address)
          return failureResponse("No address saved.", null, res);

        try {
          new mongoose.Types.ObjectId(addressId);
        } catch (error) {
          return failureResponse("Not a valid address id.", null, res);
        }

        const query = {
          _id: user.address,
          "addresses._id": new mongoose.Types.ObjectId(addressId),
        };

        const address = await this.addressService.findAddress(query);

        if (!address || address.addresses.length === 0)
          return failureResponse("No address found.", null, res);

        const addressParams = {
          $set: {
            "addresses.$.name":
              updatedFields.name ?? address?.addresses[0].name,
            "addresses.$.email":
              updatedFields.email ?? address?.addresses[0].email,
            "addresses.$.addressLine":
              updatedFields.addressLine ?? address?.addresses[0].addressLine,
            "addresses.$.state":
              updatedFields.state ?? address?.addresses[0].state,
            "addresses.$.city":
              updatedFields.city ?? address?.addresses[0].city,
            "addresses.$.pincode":
              updatedFields.pincode ?? address?.addresses[0].pincode,
            "addresses.$.phone":
              updatedFields.phone ?? address?.addresses[0].phone,
          },
        };

        const updatedAddress = await this.addressService.updateAddress(
          query,
          addressParams
        );

        if (!updatedAddress) {
          return failureResponse("No address found.", null, res);
        }

        return successResponse("User address is updated.", null, res);
      } catch (error) {
        mongoError(error, res);
      }
    } else {
      const params = ["User id", "Address id"];
      insufficientFields(res, params);
    }
  }

  public async deleteAddress(req: Request, res: Response) {
    const { id, addressId } = req.params;

    if (id && addressId) {
      const userFilter = { _id: req.params.id };

      try {
        let user = await this.userService.findUser(userFilter);
        if (!user) return failureResponse("invalid user", null, res);

        try {
          new mongoose.Types.ObjectId(addressId);
        } catch (error) {
          return failureResponse("Not a valid address id.", null, res);
        }

        let address = await this.addressService.findAddress({
          _id: user.address,
        });

        if (!address || address.addresses.length === 0)
          return failureResponse("No address found.", null, res);

        const index = address.addresses.findIndex((address) =>
          address._id.equals(new mongoose.Types.ObjectId(addressId))
        );

        if (index === -1)
          return failureResponse("Address not found", null, res);

        address.addresses.splice(index, 1);
        address = await address.save();

        if (address.addresses.length === 0) {
          this.addressService.deleteAddress(address._id);
          user.address = null;
          await user.save();
        }

        successResponse("Address removed.", null, res);
      } catch (error) {
        mongoError(error, res);
      }
    } else {
      const params = ["Product Id"];
      insufficientFields(res, params);
    }
  }
}
