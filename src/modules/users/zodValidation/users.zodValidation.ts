import { z } from "zod";

// Full Name Schema
const fullNameSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().optional(),
});

// Address Schema
const addressSchema = z.object({
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
});

// Orders Schema
export const orderSchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  price: z.number().min(0, "Price must be a positive number"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
});

// User Schema
export const userValidationSchema = z.object({
  userId: z.number().int().positive("User ID must be a positive integer"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  fullName: fullNameSchema,
  age: z.number().int().min(18, "Age must be at least 18"), 
  email: z.string().email("Invalid email format"),
  isActive: z.boolean().default(false),
  hobbies: z.array(z.string()).optional(),
  address: addressSchema.optional(),
  orders: z.array(orderSchema).min(1, "At least one order is required").optional(),
});
