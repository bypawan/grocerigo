import { Application, Request, Response } from "express";
import { UserController } from "@/controllers/userController";
import { hasPermission } from "@/config/middleware";

export class UserRoutes {
  private user_controller: UserController = new UserController();

  public route(app: Application) {
    app.post("/api/user", (req: Request, res: Response) => {
      this.user_controller.create_user(req, res);
    });

    app.post("/api/user/login", (req: Request, res: Response) => {
      this.user_controller.login_user(req, res);
    });

    app.get(
      "/api/users",
      hasPermission("canViewUsers"),
      (req: Request, res: Response) => {
        this.user_controller.get_users(req, res);
      }
    );

    app.get(
      "/api/user/:id",
      hasPermission("canViewProfile"),
      (req: Request, res: Response) => {
        this.user_controller.get_user(req, res);
      }
    );

    app.put(
      "/api/user/:id",
      hasPermission("canEditProfile"),
      (req: Request, res: Response) => {
        this.user_controller.update_user(req, res);
      }
    );

    app.delete(
      "/api/user/:id",
      hasPermission("canDeleteProfile"),
      (req: Request, res: Response) => {
        this.user_controller.delete_user(req, res);
      }
    );
  }
}
