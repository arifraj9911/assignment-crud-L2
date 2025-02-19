import { Model } from "mongoose";

export interface TFullName {
  firstName: string;
  lastName?: string;
}

export interface TAddress {
  street: string;
  city: string;
  country: string;
}

export interface TOrders {
  productName: string;
  price: number;
  quantity: number;
}

export interface TUSER {
  userId: number;
  username: string;
  password: string;
  fullName: TFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies?: string[];
  address?: TAddress;
  orders: TOrders[];
}

export interface UserModel extends Model<TUSER> {
  isUserExists(userId: number): Promise<TUSER | null>;
}
