import mongoose from "mongoose";
import { TUSER } from "./users.interface";
import { Users } from "./users.model";

const createUserIntoDB = async (userData: TUSER) => {
  try {
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

export const UserService = {
  createUserIntoDB,
  getUserFromDB,
  getSingleUsersFromDB,
};
