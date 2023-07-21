import * as jwt from "jsonwebtoken";
import { hash, compare } from "bcrypt";
import { Request, Response } from "express";

import {
  insufficientParameters,
  mongoError,
  successResponse,
  failureResponse,
} from "@/modules/common/service";
import { IUser } from "@/modules/users/model";
import Users from "@/modules/users/schema";
import UserService from "@/modules/users/service";
import { validatePassword } from "@/utils/function";

export class UserController {
  private user_service: UserService = new UserService();

  public async create_user(req: Request, res: Response) {
    // this check whether all the fields were send through the request or not
    if (req.body.name && req.body.email && req.body.password) {
      const isUser = await Users.findOne({
        email: req.body.email.toLowerCase(),
      });

      if (isUser)
        return failureResponse(
          "User with same email already exist.",
          null,
          res
        );

      if (!validatePassword(req.body.password))
        return failureResponse("Password is not valid.", null, res);

      const hashedPassword = await hash(req.body.password, 10);

      const user_params: IUser = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        modification_notes: [
          {
            modified_on: new Date(Date.now()),
            modified_by: null,
            modification_note: "New user created",
          },
        ],
      };

      try {
        const user_data = await this.user_service.createUser(user_params);
        const token = jwt.sign(
          {
            _id: user_data._id,
            role: user_data.role,
          },
          // Add env file here
          "SuperSecret"
        );

        const responseData = {
          _id: user_data.id,
          name: user_data.name,
          email: user_data.email,
          token: token,
        };

        successResponse(
          "Your account is created successfully.",
          responseData,
          res
        );
      } catch (err) {
        mongoError(err, res);
      }
    } else {
      // error response if some fields are missing in request body
      insufficientParameters(res);
    }
  }

  public async login_user(req: Request, res: Response) {
    // this check whether all the fields were send through the request or not

    if (req.body.email && req.body.password) {
      try {
        const user_data = await Users.findOne({
          email: req.body.email.toLowerCase(),
        });

        if (user_data) {
          const enteredPassword = req.body.password;
          const storedHashedPassword = user_data.password;

          const passwordMatch = await compare(
            enteredPassword,
            storedHashedPassword
          );

          if (!passwordMatch)
            return failureResponse("Password does not match.", null, res);

          const token = jwt.sign(
            {
              _id: user_data._id,
              role: user_data.role,
            },
            // Add env file here
            "SuperSecret"
          );

          const responseData = {
            _id: user_data.id,
            name: user_data.name,
            email: user_data.email,
            token: token,
          };

          return successResponse("Logged in successfully", responseData, res);
        } else {
          failureResponse("User not found", null, res);
        }
      } catch (err) {
        mongoError(err, res);
      }
    } else {
      // error response if some fields are missing in request body
      insufficientParameters(res);
    }
  }

  public async get_users(req: Request, res: Response) {
    const token = req.headers.authorization?.split(" ")[1];
    const user = jwt.verify(token, "SuperSecret") as { _id: string };

    try {
      const users = await Users.find({ _id: { $ne: user._id } });

      if (users.length >= 1) {
        successResponse("get users successful", users, res);
      } else {
        failureResponse("No user found", null, res);
      }
    } catch (err) {
      mongoError(err, res);
    }
  }

  public async get_user(req: Request, res: Response) {
    if (req.params.id) {
      const user_filter = { _id: req.params.id };

      try {
        const user_data = await this.user_service.filterUser(user_filter);

        if (user_data) {
          successResponse("get user successful", user_data, res);
        } else {
          failureResponse("invalid user", null, res);
        }
      } catch (err) {
        mongoError(err, res);
      }
    } else {
      insufficientParameters(res);
    }
  }

  public async update_user(req: Request, res: Response) {
    if (req.params.id && (req.body.name || req.body.email)) {
      const user_filter = { _id: req.params.id };

      try {
        const isUser = await Users.findOne({
          email: req.body.email.toLowerCase(),
        });

        if (isUser)
          return failureResponse(
            "User with same email already exist.",
            null,
            res
          );
      } catch (err) {
        mongoError(err, res);
      }

      try {
        const user_data = await this.user_service.filterUser(user_filter);

        if (user_data) {
          user_data.modification_notes.unshift({
            modified_on: new Date(Date.now()),
            modified_by: null,
            modification_note: "User data updated",
          });

          const user_params: IUser = {
            _id: req.params.id,
            name: req.body.name ? req.body.name.toLowerCase() : user_data.name,
            email: req.body.email
              ? req.body.email.toLowerCase()
              : user_data.email,
            modification_notes: user_data.modification_notes,
          };

          try {
            const user_data = await this.user_service.updateUser(user_params);

            const responseData = {
              _id: user_data.id,
              name: user_data.name,
              email: user_data.email,
            };

            successResponse("update user successful", responseData, res);
          } catch (err) {
            mongoError(err, res);
          }
        } else {
          failureResponse("invalid user", null, res);
        }
      } catch (err) {
        mongoError(err, res);
      }
    } else {
      insufficientParameters(res);
    }
  }

  public async delete_user(req: Request, res: Response) {
    if (req.params.id) {
      try {
        const delete_details = await this.user_service.deleteUser(
          req.params.id
        );

        if (delete_details.deletedCount !== 0) {
          successResponse("delete user successful", null, res);
        } else {
          failureResponse("Invalid user", null, res);
        }
      } catch (err) {
        mongoError(err, res);
      }
    } else {
      insufficientParameters(res);
    }
  }
}
