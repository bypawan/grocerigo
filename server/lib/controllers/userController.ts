import * as jwt from "jsonwebtoken";
import * as mongoose from "mongoose";
import { hash, compare } from "bcrypt";
import { Request, Response } from "express";

import {
  insufficientFields,
  mongoError,
  successResponse,
  failureResponse,
} from "@/modules/common/service";
import { IUser } from "@/modules/users/model";
import UserService from "@/modules/users/service";
import ProductService from "@/modules/products/service";
import { validatePassword } from "@/utils/function";

import Products from "@/modules/products/schema";

export class UserController {
  private userService: UserService = new UserService();
  private productService: ProductService = new ProductService();

  public async createUser(req: Request, res: Response) {
    const requiredFields = ["name", "email", "password"];
    const missingFields = requiredFields.filter(
      (field) => !(field in req.body)
    );

    if (missingFields.length === 0) {
      const userFilter = { email: req.body.email.toLowerCase() };
      const isUser = await this.userService.filterUser(userFilter);

      if (isUser)
        return failureResponse(
          "User with same email already exist.",
          null,
          res
        );

      const { name, email, password, wishlist } = req.body;

      if (!validatePassword(password))
        return failureResponse("Password is not valid.", null, res);

      const hashedPassword = await hash(password, 10);

      const userParams: IUser = {
        name,
        email,
        password: hashedPassword,
        wishlist,
        modificationNotes: [
          {
            modifiedOn: new Date(Date.now()),
            modifiedBy: "USER",
            modificationNote: "New user created",
          },
        ],
      };

      try {
        const user = await this.userService.createUser(userParams);
        const token = jwt.sign(
          {
            _id: user._id,
            role: user.role,
          },
          // Add env file here
          "SuperSecret"
        );

        const responseData = {
          _id: user.id,
          name: user.name,
          email: user.email,
          token: token,
        };

        successResponse(
          "Your account is created successfully.",
          responseData,
          res
        );
      } catch (error) {
        mongoError(error, res);
      }
    } else {
      insufficientFields(res, missingFields);
    }
  }

  public async loginUser(req: Request, res: Response) {
    if (req.body.email && req.body.password) {
      try {
        const userFilter = { email: req.body.email.toLowerCase() };
        const user = await this.userService.filterUser(userFilter);

        if (!user) return failureResponse("User not found", null, res);

        const enteredPassword = req.body.password;
        const storedHashedPassword = user.password;

        const passwordMatch = await compare(
          enteredPassword,
          storedHashedPassword
        );

        if (!passwordMatch)
          return failureResponse("Password does not match.", null, res);

        const token = jwt.sign(
          {
            _id: user._id,
            role: user.role,
          },
          // Add env file here
          "SuperSecret"
        );

        const responseData = {
          _id: user.id,
          name: user.name,
          email: user.email,
          token: token,
        };

        return successResponse("Logged in successfully", responseData, res);
      } catch (error) {
        mongoError(error, res);
      }
    } else {
      insufficientFields(res);
    }
  }

  public async getUsers(req: Request, res: Response) {
    const token = req.headers.authorization?.split(" ")[1];
    let user: { _id: string | undefined };

    try {
      const decodedToken = jwt.verify(
        token as string,
        "SuperSecret"
      ) as unknown;

      user = { _id: (decodedToken as { _id: string | undefined })._id };
    } catch (error) {
      user = { _id: undefined };
      return failureResponse("JWT verification error", null, res);
    }

    try {
      const query = { _id: { $ne: user._id } };
      const users = await this.userService.fetchUsers(query);

      if (users.length === 0)
        return failureResponse("No user found", null, res);

      successResponse("get users successful", users, res);
    } catch (error) {
      mongoError(error, res);
    }
  }

  public async getUser(req: Request, res: Response) {
    if (req.params.id) {
      const userFilter = { _id: req.params.id };

      try {
        const user = await this.userService.filterUser(userFilter);

        if (!user) return failureResponse("invalid user", null, res);

        successResponse("get user successful", user, res);
      } catch (error) {
        mongoError(error, res);
      }
    } else {
      insufficientFields(res);
    }
  }

  public async updateUser(req: Request, res: Response) {
    const { ...updatedFields } = req.body;

    if (req.params.id && Object.keys(updatedFields).length >= 1) {
      try {
        const userFilter = { _id: req.params.id };
        const user = await this.userService.filterUser(userFilter);
        const existingUser = await this.userService.filterUser({
          email: req.body.email.toLowerCase(),
        });

        if (
          existingUser &&
          !new mongoose.Types.ObjectId(req.params.id).equals(existingUser._id)
        )
          return failureResponse(
            "User with same email already exist.",
            null,
            res
          );

        if (!user) return failureResponse("invalid user", null, res);

        const { name, email } = req.body;

        user.modificationNotes.unshift({
          modifiedOn: new Date(Date.now()),
          modifiedBy: "USER",
          modificationNote: "User data updated",
        });

        const userParams: IUser = {
          _id: req.params.id,
          name: name.toLowerCase() ?? user.name,
          email: email.toLowerCase() ?? user.email,
          modificationNotes: user.modificationNotes,
        };

        try {
          const user = await this.userService.updateUser(userParams);

          if (!user) return failureResponse("invalid user", null, res);

          const responseData = {
            _id: user.id,
            name: user.name,
            email: user.email,
          };

          successResponse("update user successful", responseData, res);
        } catch (error) {
          mongoError(error, res);
        }
      } catch (error) {
        mongoError(error, res);
      }
    } else {
      insufficientFields(res);
    }
  }

  public async deleteUser(req: Request, res: Response) {
    if (req.params.id) {
      try {
        const deleteDetails = await this.userService.deleteUser(req.params.id);

        if (deleteDetails.deletedCount === 0)
          return failureResponse("Invalid user", null, res);

        successResponse("delete user successful", null, res);
      } catch (error) {
        mongoError(error, res);
      }
    } else {
      insufficientFields(res);
    }
  }

  public async getUserItems(req: Request, res: Response) {
    if (req.params.id) {
      const userFilter = { _id: req.params.id };

      try {
        const user = await this.userService.filterUser(userFilter);

        if (!user) return failureResponse("invalid user", null, res);
        const wishlistProductIds = user.wishlist;
        const validIds = wishlistProductIds
          .map((id) => {
            try {
              return new mongoose.Types.ObjectId(id);
            } catch (error) {
              return null;
            }
          })
          .filter((id) => id !== null);
        const query = { _id: { $in: validIds } };
        const page = parseInt(req.query.page as string) || 1;

        const products = await this.productService.fetchProducts(
          page,
          10,
          query,
          {
            modificationNotes: 0,
          }
        );

        if (products?.products.length === 0)
          return failureResponse("NO products found.", null, res);

        return successResponse("User wishlist is retrieved.", products, res);
      } catch (error) {
        console.log(error);
        mongoError(error, res);
      }
    } else {
      insufficientFields(res);
    }
  }
}
