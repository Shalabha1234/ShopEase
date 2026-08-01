import { Request, Response } from "express";
import * as userService from "../services/userService";

// ==========================================
// GET ALL USERS
// ==========================================

export async function getUsers(
  req: Request,
  res: Response
) {

  try {

    const users =
      await userService.getAllUsers();

    res.json(users);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message:
        "Failed to fetch users",
    });

  }

}

export async function getUser(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);

    const user = await userService.getUserById(id);

    res.json(user);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch user",
    });
  }
}

export async function updateUser(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);

    const user = await userService.updateUser(
      id,
      req.body
    );

    res.json(user);
  } catch (error: any) {
  console.error(error);

  res.status(500).json({
    message: error.message,
    error,
  });
}
}