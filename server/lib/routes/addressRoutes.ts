import { Application, Request, Response } from "express";

import { hasPermission } from "@/config/middleware";
import { AddressController } from "@/controllers/addressController";

export class AddressRoutes {
  private addressController: AddressController = new AddressController();

  public route(app: Application) {
    app.post(
      "/api/user/:id/address",
      hasPermission("canCreateAddress"),
      (req: Request, res: Response) => {
        this.addressController.createAddress(req, res);
      }
    );

    app.get(
      "/api/user/:id/addresses",
      hasPermission("canViewAddress"),
      (req: Request, res: Response) => {
        this.addressController.getUserAddresses(req, res);
      }
    );

    app.get(
      "/api/user/:id/address/:addressId",
      hasPermission("canViewAddress"),
      (req: Request, res: Response) => {
        this.addressController.getUserAddress(req, res);
      }
    );

    app.put(
      "/api/user/:id/address/:addressId",
      hasPermission("canEditAddress"),
      (req: Request, res: Response) => {
        this.addressController.updateUserAddress(req, res);
      }
    );

    app.delete(
      "/api/user/:id/address/:addressId",
      hasPermission("canDeleteAddress"),
      (req: Request, res: Response) => {
        this.addressController.deleteAddress(req, res);
      }
    );
  }
}
