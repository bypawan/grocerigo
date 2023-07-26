import { Application, Request, Response } from "express";
import { UserController } from "@/controllers/userController";
import { hasPermission } from "@/config/middleware";

export class UserRoutes {
  private userController: UserController = new UserController();

  public route(app: Application) {
    app.post("/api/user", (req: Request, res: Response) => {
      this.userController.createUser(req, res);
    });

    app.post("/api/user/login", (req: Request, res: Response) => {
      this.userController.loginUser(req, res);
    });

    app.get(
      "/api/users",
      hasPermission("canViewUsers"),
      (req: Request, res: Response) => {
        this.userController.getUsers(req, res);
      }
    );

    app.get(
      "/api/user/:id",
      hasPermission("canViewProfile"),
      (req: Request, res: Response) => {
        this.userController.getUser(req, res);
      }
    );

    app.put(
      "/api/user/:id",
      hasPermission("canEditProfile"),
      (req: Request, res: Response) => {
        this.userController.updateUser(req, res);
      }
    );

    app.delete(
      "/api/user/:id",
      hasPermission("canDeleteProfile"),
      (req: Request, res: Response) => {
        this.userController.deleteUser(req, res);
      }
    );

    app.get(
      "/api/user/:id/wishlist",
      hasPermission("canViewWishlist"),
      (req: Request, res: Response) => {
        this.userController.getUserItems(req, res);
      }
    );
  }
}
