import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Setup för __dirname i ES-moduler
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ladda .env-filer (först backend/.env, sen root .env som fallback)
dotenv.config({ path: path.join(__dirname, ".env") });
dotenv.config({ path: path.join(__dirname, "../.env") });

console.log("ENV check", {
  shopId: process.env.SPREADSHOP_ID,
  hasKey: !!process.env.SPREADSHOP_API_KEY,
  hasSecret: !!process.env.SPREADSHOP_API_SECRET,
  userAgent: process.env.SPREAD_USER_AGENT,
});

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.js";
import profileRoutes from "./routes/profile.js";
import merchRoutes from "./routes/merch.js";

// Environment variables
const PORT = process.env.PORT || 8080;
const MONGO_URL =
  process.env.MONGO_URL || "mongodb://localhost:27017/morbid-gene-2";

// Connect to MongoDB
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Logga varje request (metod + url)
app.use((req, res, next) => {
  console.log(`→ ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get("/", (req, res) => res.send("Hello Technigo!"));

// Routes
app.use("/auth", authRoutes);
app.use("/user", profileRoutes);
app.use("/api/merch", merchRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
