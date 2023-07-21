// middleware.ts

import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { permissions } from "./permissions";
import { response_status_codes } from "@/modules/common/model";

// Interface for user information in the decoded JWT token
interface DecodedUser {
  userId: string;
  role: string;
}

// Middleware to check if user has permission for an action
export const hasPermission =
  (action: string) => (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(response_status_codes.Unauthorized).json({
        STATUS: "SUCCESS",
        MESSAGE: "Unauthorized. Token not provided.",
        DATA: null,
      });
    }

    // Add env file here
    try {
      const user = jwt.verify(token, "SuperSecret") as DecodedUser;
      const userRole = user.role;

      if (!userRole || !permissions[userRole][action]) {
        return res.status(response_status_codes.Forbidden).json({
          STATUS: "SUCCESS",
          MESSAGE: "Access forbidden. Insufficient permissions.",
          DATA: null,
        });
      }

      // If the action is "canEditProfile" or "canDeleteProfile", allow users to modify/delete their own profile
      if (
        (action === "canEditProfile" ||
          action === "canViewProfile" ||
          action === "canDeleteProfile") &&
        req.params.id !== user.userId
      ) {
        return res.status(response_status_codes.Forbidden).json({
          STATUS: "SUCCESS",
          MESSAGE:
            "Access forbidden. You can only view,modify or delete your own profile.",
          DATA: null,
        });
      }

      next();
    } catch (error) {
      return res.status(response_status_codes.Unauthorized).json({
        STATUS: "SUCCESS",
        MESSAGE: "Unauthorized. Invalid token.",
        DATA: null,
      });
    }
  };
