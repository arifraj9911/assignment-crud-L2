/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { UserService } from "./users.service";
import { userValidationSchema } from "./zodValidation/users.zodValidation";

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;

    const userValidationsWithZod = userValidationSchema.parse(user);

    const result = await UserService.createUserIntoDB(userValidationsWithZod);
    res.status(200).json({
      success: true,
      message: "User is created successfully",
      data: result,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message || "Something is wrong",
      error: error,
    });
  }
};
const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getUserFromDB();
    res.status(200).json({
      success: true,
      message: "User getting successfully",
      data: result,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      success: true,
      message: error.message || "Something went wrong",
      error: error,
    });
  }
};
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserService.getSingleUsersFromDB(userId);
    res.status(200).json({
      success: true,
      message: "User getting successfully",
      data: result,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      error: error,
    });
  }
};

export const UserController = {
  createUser,
  getUsers,
  getSingleUser,
};
