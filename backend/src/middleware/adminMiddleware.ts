import { Response, NextFunction } from "express";

import supabase from "../config/supabase";

import {
  AuthRequest,
} from "./authMiddleware";

export async function verifyAdmin(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    // Make sure the user is authenticated
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized. Please login first.",
      });
    }

    // Get the user from the database
    const {
      data: user,
      error,
    } = await supabase
      .from("users")
      .select("id, is_admin")
      .eq("id", req.user.id)
      .single();

    // Database error
    if (error || !user) {
      return res.status(401).json({
        message: "User not found.",
      });
    }

    // Check admin status
    if (user.is_admin !== true) {
      return res.status(403).json({
        message:
          "Access denied. Admin privileges required.",
      });
    }

    // User is an admin
    next();

  } catch (error) {
    console.error(
      "Admin verification failed:",
      error
    );

    return res.status(500).json({
      message:
        "Failed to verify admin privileges.",
    });
  }
}