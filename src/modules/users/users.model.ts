import { HydratedDocument, model, Schema } from "mongoose";
import { TAddress, TFullName, TOrders, TUSER } from "./users.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const fullNameSchema = new Schema<TFullName>({
  firstName: { type: String, required: true },
  lastName: { type: String },
});

const addressSchema = new Schema<TAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const orderSchema = new Schema<TOrders>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const userSchema = new Schema<TUSER>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: fullNameSchema,
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  isActive: { type: Boolean, default: false },
  hobbies: { type: [String], required: false },
  address: { type: addressSchema, required: false },
  orders: { type: [orderSchema], required: true },
});

// pre document middleware
userSchema.pre("save", async function (next) {
  const user = this as HydratedDocument<TUSER>;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.passSaltsRounds)
  );
  next();
});

// post document middleware
userSchema.post("save", async function (doc, next) {
  doc.password = "";
  next();
});

export const Users = model<TUSER>("Users", userSchema);
