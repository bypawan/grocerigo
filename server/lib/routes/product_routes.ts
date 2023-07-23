import { Application, Request, Response } from "express";

import { ProductController } from "@/controllers/productController";
import { hasPermission } from "@/config/middleware";

export class ProductRoutes {
  private product_controller: ProductController = new ProductController();

  public route(app: Application) {
    app.post(
      "/api/product",
      hasPermission("canCreateProduct"),
      (req: Request, res: Response) => {
        this.product_controller.create_product(req, res);
      },

      app.get("/api/products", (req: Request, res: Response) => {
        this.product_controller.get_products(req, res);
      })
    );
  }
}
