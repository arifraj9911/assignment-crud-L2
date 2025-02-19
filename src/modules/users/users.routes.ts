import express from "express";
import { UserController } from "./users.controller";

const router = express.Router();

router.post("/create", UserController.createUser);
router.get("/get", UserController.getUsers);
router.get("/get/:userId", UserController.getSingleUser);

export const UsersRouter = router;
