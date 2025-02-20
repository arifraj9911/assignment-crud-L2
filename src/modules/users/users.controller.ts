/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { UserService } from "./users.service";
import {
  orderSchema,
  userValidationSchema,
} from "./zodValidation/users.zodValidation";

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
const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { user } = req.body;
    const result = await UserService.updatedUserIntoDB(userId, user);
    res.status(200).json({
      success: true,
      message: "User updated successfully",
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
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    await UserService.deleteUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
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
const ordersBySpecificUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserService.findOrderForSpecificUser(userId);
    res.status(200).json({
      success: true,
      message: "Order fetched successfully!",
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

const createOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const orders = req.body;
    console.log(orders);
    const orderValidationWithZod = orderSchema.parse(orders);
    await UserService.appendOrdersToDB(userId, orderValidationWithZod);
    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: null,
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

const calculateTotal = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UserService.totalOrderPriceSingleUser(userId);
    res.status(200).json({
      success: true,
      message: "Total price calculated successfully!",
      data: {
        totalPrice: result,
      },
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};

export const UserController = {
  createUser,
  getUsers,
  getSingleUser,
  deleteUser,
  updateUser,
  ordersBySpecificUser,
  createOrders,
  calculateTotal
};
