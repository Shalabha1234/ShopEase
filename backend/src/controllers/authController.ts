import { Request, Response } from "express";
import * as authService from "../services/authService";

export async function register(
  req: Request,
  res: Response
) {
  try {
    const { name, email, password } = req.body;

    const user = await authService.registerUser(
      name,
      email,
      password
    );

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
}

export async function login(
  req: Request,
  res: Response
) {
  try {
    const { email, password } = req.body;

    const result = await authService.loginUser(
      email,
      password
    );

    res.status(200).json({
      message: "Login successful",
      token: result.token,
      user: result.user,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
}