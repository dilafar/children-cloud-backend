import mongoose from "mongoose";
import findOrCreate from "mongoose-findorcreate";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    userName: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    mobile: {
      type: String,
    },
    address: {
      type: String,
    },
    url: {
      type: String,
    },
    role: {
      type: String,
      default: "kid",
    },
    permission: {
      type: String,
      enum: ["admin", "parent", "kid", "staff"],
      default: "user",
    },
    passwordChangedAt: Date,
  },
  {
    timestamps: true,
  },
);

UserSchema.plugin(findOrCreate);

export const User = mongoose.model("User", UserSchema);
