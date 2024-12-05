import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "FirstName is required!"],
    },
    lastName: {
      type: String,
      required: [true, "LastName is required!"],
    },
    userName: {
      type: String,
      required: [true, "UserName is required!"],
      unique: true,
    },
    gender: {
      type: String,
      required: [true, "Gender id required!"],
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: true,
      validate: {
        validator: (email) => email.includes("@"),
        message: "please provide valid email!",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
    },
    confirmPassword: {
      type: String,
      required: [true, "Conform password is required!"],
    },
    token: {
      type: String,
      required: false,
      default: null,
    },
  },
  { timeseries: true }
);

export const userModel = mongoose.model("users", userSchema);
