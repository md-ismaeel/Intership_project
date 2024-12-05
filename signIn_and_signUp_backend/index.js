import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";

import routes from "./Routes/user.routes.js";

const corsOptions = {
  origin: [
    "http://localhost:5173",
    // "https://flurnpokedexreact.netlify.app"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

const PORT = 10000;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

const mongoUri = "mongodb://localhost:27017/itux";

mongoose
  .connect(mongoUri)
  .then(() => console.log("MongoDB connection established successfully"))
  .catch((err) =>
    console.log("ERROR occurred while connecting to the database: " + err)
  );

app.use("/api/v1/user", routes);

app.use("/*", (req, res) => {
  return res.status(404).json({
    sucess: false,
    message: "path not found!",
  });
});

app.listen(PORT, (error) =>
  error
    ? "Error" + error
    : console.log(`Server is up and running on port ${PORT}`)
);
