import * as jwt from "jsonwebtoken";
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

      // If the action is "canEditProfile" or "canDeleteProfile", allow users to modify/delete their own profile
      if (
        action === "canEditProfile" ||
        action === "canViewProfile" ||
        action === "canDeleteProfile" ||
        (action === "canViewWishlist" && req.params.id !== user._id)
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
