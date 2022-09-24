import express from "express";
import {
  saveChildController,
  updateChildController,
  deleteChildController,
  getChildsController,
  getAllChildsController,
  getChildstempController,
} from "../controllers/index.js";
import { authenticate } from "../middleware/auth.middleware.js";

const childRouter = express.Router();

childRouter.post("/", authenticate, saveChildController);
childRouter.delete("/:id", deleteChildController);
childRouter.put("/:id", updateChildController);
childRouter.get("/", authenticate, getChildsController);
childRouter.get("temp/:id", getChildstempController);
childRouter.get("/all", getAllChildsController);

export default childRouter;
