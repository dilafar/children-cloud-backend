import jwt from "jsonwebtoken";
import { getUser } from "../repository/index.js";
import AppError from "../utils/appError.js";
import { promisify } from "util";

export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return next(
        new AppError(
          "You are not logged in , please logged in to get access.",
          401,
        ),
      );
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await getUser({ _id });
    if (!user) {
      res.status(401).send("Unauthorized");
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    res.status(401).send("Unauthorized");
  }
};

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.permission)) {
      return next(new AppError("permission denied !!!.", 403));
    }
    next();
  };
};
