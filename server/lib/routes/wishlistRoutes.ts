import { Application, Request, Response } from "express";
import { WishlistController } from "@/controllers/wishlistController";
import { hasPermission } from "@/config/middleware";

export class WishlistRoutes {
  private wishlistController: WishlistController = new WishlistController();

  public route(app: Application) {
    app.get(
      "/api/user/:id/wishlist",
      hasPermission("canViewWishlist"),
      (req: Request, res: Response) => {
        this.wishlistController.getUserWishlist(req, res);
      }
    );

    app.post(
      "/api/user/:id/wishlist",
      hasPermission("canEditWishlist"),
      (req: Request, res: Response) => {
        this.wishlistController.addProductToUserWishlist(req, res);
      }
    );

    app.delete(
      "/api/user/:id/wishlist/:productId",
      hasPermission("canDeleteWishlist"),
      (req: Request, res: Response) => {
        this.wishlistController.removeProductFromUserWishlist(req, res);
      }
    );
  }
}
