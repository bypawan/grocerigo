import { Application, Request, Response } from "express";
import { hasPermission } from "@/config/middleware";
import { CartController } from "@/controllers/cartController";

export class CartRoutes {
  private cartController: CartController = new CartController();

  public route(app: Application) {
    app.get(
      "/api/user/:id/cart",
      hasPermission("canViewCart"),
      (req: Request, res: Response) => {
        this.cartController.getUserCart(req, res);
      }
    );

    app.post(
      "/api/user/:id/cart",
      hasPermission("canEditCart"),
      (req: Request, res: Response) => {
        this.cartController.addProductToUserCart(req, res);
      }
    );

    app.delete(
      "/api/user/:id/cart/:productId",
      hasPermission("canDeleteCart"),
      (req: Request, res: Response) => {
        this.cartController.removeProductFromUserCart(req, res);
      }
    );
  }
}
