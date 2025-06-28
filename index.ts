import dotenv from "dotenv";
dotenv.config();



import express from "express";
import mongoose from "mongoose";

import cors from "cors";
import bodyParser from "body-parser";

import transactionRoutes from "./routes/transactionRoutes"; // ✅ <- Import your route
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";

// app.use("/api/auth", authRoutes);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use("/api/user", userRoutes);

app.use("/api/transactions", transactionRoutes);

app.use(cors());
app.use(bodyParser.json());

app.use("/api/transactions", transactionRoutes); // ✅ <- Register the route
app.use("/api/auth", authRoutes);

app.get("/", (_req, res) => {
  res.send("Financial Dashboard Backend is running!");
});

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
