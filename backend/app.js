import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToDB from "./db/db.js";
import userRoutes from "./routes/userRoutes.js";
import captainRoutes from "./routes/captainRoutes.js";

const app = express();

connectToDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello I'm from Backend");
});

app.use("/users", userRoutes);
app.use("/captain", captainRoutes);

export default app;
