import { Application, Request, Response } from "express";

import { ProductController } from "@/controllers/productController";
import { hasPermission } from "@/config/middleware";

export class ProductRoutes {
  private productController: ProductController = new ProductController();

  public route(app: Application) {
    app.post(
      "/api/product",
      hasPermission("canCreateProduct"),
      (req: Request, res: Response) => {
        this.productController.createProduct(req, res);
      }
    );

    app.get("/api/products", (req: Request, res: Response) => {
      this.productController.getProducts(req, res);
    });

    app.get("/api/product/:id", (req: Request, res: Response) => {
      this.productController.getProduct(req, res);
    });

    app.put(
      "/api/product/:id",
      hasPermission("canEditProduct"),
      (req: Request, res: Response) => {
        this.productController.updateProduct(req, res);
      }
    );

    app.delete(
      "/api/product/:id",
      hasPermission("canDeleteProduct"),
      (req: Request, res: Response) => {
        this.productController.deleteProduct(req, res);
      }
    );
  }
}
