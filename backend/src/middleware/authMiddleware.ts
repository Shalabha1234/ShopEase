import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
  };
}

export function verifyToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    // Get Authorization header
    const authHeader =
      req.headers.authorization;

    // Check if token exists
    if (!authHeader) {
      return res.status(401).json({
        message: "Access denied. No token provided.",
      });
    }

    // Expected format:
    // Bearer TOKEN
    const token =
      authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Access denied. Invalid token.",
      });
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as {
      id: number;
      email: string;
    };

    // Store user information
    // inside request
    req.user = {
      id: decoded.id,
      email: decoded.email,
    };

    // Continue to next middleware
    next();

  } catch (error) {
    console.error(
      "Token verification failed:",
      error
    );

    return res.status(401).json({
      message: "Invalid or expired token.",
    });
  }
}