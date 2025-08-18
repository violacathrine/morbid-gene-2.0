import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.js";
import profileRoutes from "./routes/profile.js";
import merchRoutes from "./routes/merch.js";

// Setup för __dirname i ES-moduler
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ladda .env-filer (först backend/.env, sen root .env som fallback)
dotenv.config({ path: path.join(__dirname, ".env") });
dotenv.config({ path: path.join(__dirname, "../.env") });

// Validera kritiska miljövariabler
const requiredEnvVars = [
  "SPREADSHOP_ID",
  "SPREADSHOP_API_KEY",
  "SPREAD_USER_AGENT",
  "JWT_SECRET",
];
const missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);

if (missingVars.length > 0) {
  console.error(`❌ Saknade miljövariabler: ${missingVars.join(", ")}`);
  console.error("Kontrollera din .env-fil");
  process.exit(1);
}

// Debug info
console.log("✅ Miljövariabler laddade:", {
  shopId: process.env.SPREADSHOP_ID,
  hasApiKey: !!process.env.SPREADSHOP_API_KEY,
  hasJwtSecret: !!process.env.JWT_SECRET,
  userAgent: process.env.SPREAD_USER_AGENT,
});

// Environment variables
const PORT = process.env.PORT || 8080;
const MONGO_URL =
  process.env.MONGO_URL || "mongodb://localhost:27017/morbid-gene-2";

// Connect to MongoDB
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("✅ MongoDB ansluten"))
  .catch((error) => {
    console.error("❌ MongoDB anslutningsfel:", error);
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
app.get("/", (req, res) => {
  res.json({
    name: "Morbid Gene API",
    status: "running",
    version: "1.0.0",
    endpoints: {
      auth: "/auth",
      user: "/user",
      merch: "/api/merch",
    },
  });
});

// Routes
app.use("/auth", authRoutes);
app.use("/user", profileRoutes);
app.use("/api/merch", merchRoutes);

// 404 handler för okända endpoints
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Endpoint not found",
    message: `${req.method} ${req.originalUrl} finns inte`,
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error("❌ Server error:", err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("👋 Stänger av servern...");
  mongoose.connection.close();
  process.exit(0);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
