import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

import { UserRoutes } from "@/routes/user_routes";
import { ProductRoutes } from "@/routes/product_routes";
import { CommonRoutes } from "@/routes/common_routes";

class App {
  public app: express.Application;

  private user_routes: UserRoutes = new UserRoutes();
  private product_routes: ProductRoutes = new ProductRoutes();
  private common_routes: CommonRoutes = new CommonRoutes();

  constructor() {
    this.app = express();
    this.config();
    this.mongoSetup();
    this.user_routes.route(this.app);
    this.product_routes.route(this.app);
    this.common_routes.route(this.app);
  }

  private config(): void {
    // support application/json type post data
    this.app.use(bodyParser.json());
    //support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private mongoSetup(): void {
    // mongoose.connect("mongodb://127.0.0.1:27017");

    mongoose
      .connect(`${process.env.DB_URL}`)
      .then(() => console.log("Mongo DB connected successfully."))
      .catch((error) => console.log("Error Connecting!", error));
  }
}

export default new App().app;
