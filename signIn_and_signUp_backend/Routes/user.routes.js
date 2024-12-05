import express from "express";
import {
  SignIn,
  SignOut,
  SignUp,
  ForgetPassword,
} from "../Controller/user.controller.js";
import { authenticateUser } from "../Middleware/user.auth.js";

const routes = express.Router();

routes.post("/sign-up", SignUp);
routes.post("/sign-in", SignIn);
routes.get("/sign-out", authenticateUser, SignOut);
routes.post("/forget-password", ForgetPassword);

export default routes;
