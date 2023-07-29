import * as jwt from "jsonwebtoken";
import * as mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";

import { permissionsWihIndexSignature } from "./permissions";
import { responseStatusCodes } from "@/modules/common/model";

// Interface for user information in the decoded JWT token
export interface DecodedUser {
  _id: string;
  role: string;
}

// Middleware to check if user has permission for an action
export const hasPermission =
  (action: string) => (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(responseStatusCodes.Unauthorized).json({
        STATUS: "SUCCESS",
        MESSAGE: "Unauthorized. Token not provided.",
        DATA: null,
      });
    }

    // Add env file here
    try {
      const user = jwt.verify(token, "SuperSecret") as DecodedUser;
      const userRole = user.role;

      if (!userRole || !permissionsWihIndexSignature[userRole][action]) {
        return res.status(responseStatusCodes.Forbidden).json({
          STATUS: "SUCCESS",
          MESSAGE: "Access forbidden. Insufficient permissions.",
          DATA: null,
        });
      }

      const userId = new mongoose.Types.ObjectId(user._id);
      const reqParamsId = new mongoose.Types.ObjectId(req.params.id);

      if (
        (action === "canEditProfile" ||
          action === "canViewProfile" ||
          action === "canDeleteProfile" ||
          action === "canViewWishlist" ||
          action === "canEditWishlist" ||
          action === "canDeleteWishlist" ||
          action === "canViewCart" ||
          action === "canEditCart" ||
          action === "canDeleteCart") &&
        !userId.equals(reqParamsId)
      ) {
        return res.status(responseStatusCodes.Forbidden).json({
          STATUS: "SUCCESS",
          MESSAGE:
            "Access forbidden. You can only view,modify or delete your own data.",
          DATA: null,
        });
      }

      next();
    } catch (error) {
      return res.status(responseStatusCodes.Unauthorized).json({
        STATUS: "SUCCESS",
        MESSAGE: "Unauthorized. Invalid token.",
        DATA: null,
      });
    }
  };
