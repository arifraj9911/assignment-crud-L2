/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { TUSER } from "./users.interface";
import { Users } from "./users.model";

const createUserIntoDB = async (userData: TUSER) => {
  try {
    // if (await Users.isUserExists(userData.userId)) {
    //   console.log('user found')
    //   throw new Error("User already exists");
    // }

    const existingUser = await Users.isUserExists(userData.userId);

    if (existingUser) {
      throw new Error("User already exist in DB");
    }

    const users = new Users(userData);
    const result = await users.save();
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getUserFromDB = async () => {
  try {
    const result = await Users.aggregate([
      { $match: {} },
      { $project: { password: 0 } },
    ]);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getSingleUsersFromDB = async (id: string) => {
  try {
    // const result = await Users.findOne({ _id: id });
    const result = await Users.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      { $project: { password: 0 } },
    ]);

    if (!result) {
      throw new Error("Users not found");
    }

    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updatedUserIntoDB = async (id: string, userData: TUSER) => {
  try {
    const result = await Users.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      { $set: userData },
      {
        new: true,
        runValidators: true,
        projection: { password: 0 },
      }
    );
    if (!result) {
      throw new Error("User not found");
    }

    // const result = await Users.updateOne(
    //   { _id: new mongoose.Types.ObjectId(id) },
    //   { $set: userData },
    //   { runValidators: true, new: true }
    // );

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteUserFromDB = async (id: string) => {
  try {
    // const user = await Users.aggregate([
    //   { $match: { _id: new mongoose.Types.ObjectId(id) } },
    // ]);

    // console.log("user from delete", user);

    // if (!user || user.length === 0) {
    //   // console.log("from not user");
    //   throw new Error("Users not found");
    // }

    // return await Users.deleteOne({
    //   _id: new mongoose.Types.ObjectId(id),
    // });

    const result = await Users.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(id),
    });
    if (!result) {
      throw new Error("User not found");
    }
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const findOrderForSpecificUser = async (id: string) => {
  try {
    const orders = await Users.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      { $project: { orders: 1 } },
    ]);

    if (!orders) {
      throw new Error("User not found");
    }

    return orders;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const appendOrdersToDB = async (
  id: string,
  newOrders: { productName: string; price: number; quantity: number }
): Promise<any> => {
  try {
    const user = await Users.findById(id);

    if (!user) {
      throw new Error("Users not found");
    }

    if (!Array.isArray(user.orders)) {
      user.orders = [];
    }

    user.orders.push(newOrders);

    const updatedUser = user.save();

    return updatedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const totalOrderPriceSingleUser = async (id: string): Promise<number> => {
  try {
    const result = await Users.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      { $unwind: "$orders" },
      {
        $group: {
          _id: null,
          totalPrice: {
            $sum: { $multiply: ["$orders.price", "$orders.quantity"] },
          },
        },
      },
    ]);

    if (!result) {
      throw new Error("User not found");
    }

    return result.length > 0 ? result[0].totalPrice : 0;
  } catch (error) {
    console.log("Error calculating total order price:", error);
    throw error;
  }
};

export const UserService = {
  createUserIntoDB,
  getUserFromDB,
  getSingleUsersFromDB,
  deleteUserFromDB,
  updatedUserIntoDB,
  findOrderForSpecificUser,
  appendOrdersToDB,
  totalOrderPriceSingleUser
};
