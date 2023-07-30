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
      "/api/user/:id/address",
      hasPermission("canViewAddress"),
      (req: Request, res: Response) => {
        this.addressController.getUserAddress(req, res);
      }
    );
  }
}
