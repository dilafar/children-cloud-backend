import express from "express";
import {
  saveUser,
  loginUser,
  getUser,
  getAllUsers,
  viewProfile,
  updateUser,
  deleteUser,
  getStaffController,
} from "../controllers/index.js";
import { authenticate, restrictTo } from "../middleware/auth.middleware.js";

const userRouter = express.Router();

userRouter.post("/", saveUser);
userRouter.post("/login", loginUser);
userRouter.get(
  "/me",
  authenticate,
  restrictTo("admin", "parent", "staff"),
  viewProfile,
);
userRouter.get(
  "/:id",
  authenticate,
  restrictTo("admin", "parent", "staff"),
  getUser,
);
userRouter.get("/", authenticate, restrictTo("admin"), getAllUsers);
userRouter.put("/:id", authenticate, restrictTo("admin", "staff"), updateUser);
userRouter.delete("/:id", authenticate, restrictTo("admin"), deleteUser);
userRouter.get("/stf", getStaffController);

export default userRouter;
