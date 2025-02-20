import express from "express";
import { UserController } from "./users.controller";

const router = express.Router();

router.post("/create", UserController.createUser);
router.get("/get", UserController.getUsers);
router.get("/get/:userId", UserController.getSingleUser);
router.delete("/delete/:userId", UserController.deleteUser);
router.patch("/update/:userId", UserController.updateUser);
router.get("/order/:userId", UserController.ordersBySpecificUser);
router.put("/:userId/orders", UserController.createOrders);
router.get("/:userId/orders/total-price", UserController.calculateTotal);

export const UsersRouter = router;
