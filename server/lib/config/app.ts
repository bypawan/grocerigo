import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

import { UserRoutes } from "@/routes/userRoutes";
import { ProductRoutes } from "@/routes/productRoutes";
import { WishlistRoutes } from "@/routes/wishlistRoutes";
import { CommonRoutes } from "@/routes/commonRoutes";
import { CartRoutes } from "@/routes/cartRoutes";
import { AddressRoutes } from "@/routes/addressRoutes";

class App {
  public app: express.Application;

  private userRoutes: UserRoutes = new UserRoutes();
  private productRoutes: ProductRoutes = new ProductRoutes();
  private wishlistRoutes: WishlistRoutes = new WishlistRoutes();
  private cartRoutes: CartRoutes = new CartRoutes();
  private addressRoutes: AddressRoutes = new AddressRoutes();
  private commonRoutes: CommonRoutes = new CommonRoutes();

  constructor() {
    this.app = express();
    this.config();
    this.mongoSetup();
    this.userRoutes.route(this.app);
    this.productRoutes.route(this.app);
    this.wishlistRoutes.route(this.app);
    this.cartRoutes.route(this.app);
    this.addressRoutes.route(this.app);
    this.commonRoutes.route(this.app);
  }

  private config(): void {
    // support application/json type post data
    this.app.use(bodyParser.json());
    //support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private mongoSetup(): void {
    mongoose
      .connect(`${process.env.DB_URL}`)
      .then(() => console.log("Mongo DB connected successfully."))
      .catch((error) => console.log("Error Connecting!", error));
  }
}

export default new App().app;
