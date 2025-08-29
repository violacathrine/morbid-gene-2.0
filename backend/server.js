import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import cron from "node-cron";

import authRoutes from "./routes/auth.js";
import profileRoutes from "./routes/profile.js";
import merchRoutes from "./routes/merch.js";
import cleanupRoutes from "./routes/cleanup.js";
import contactRoutes from "./routes/contact.js";
import User from "./models/User.js";

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

// Environment variables
const PORT = process.env.PORT || 8080;
const MONGO_URL =
  process.env.MONGO_URL || "mongodb://localhost:27017/morbid-gene-2";

// Connect to MongoDB
mongoose
  .connect(MONGO_URL)
  .then(() => {})
  .catch((error) => {
    console.error("❌ MongoDB anslutningsfel:", error);
    process.exit(1);
  });

// Create Express app
const app = express();

// CORS configuration for production
const corsOptions = {
  origin: [
    'http://localhost:5173', // Vite dev server
    'http://localhost:5174', // Alternative Vite dev port
    'http://localhost:3000', // Alternative dev port
    'https://morbidgeneofficial.com', // Production frontend (custom domain)
    process.env.FRONTEND_URL || 'https://morbidgeneofficial.netlify.app', // Production frontend (netlify)
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

// Logga varje request (metod + url)
app.use((req, res, next) => {
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
      contact: "/api/forms",
    },
  });
});

// Routes
app.use("/auth", authRoutes);
app.use("/user", profileRoutes);
app.use("/api/merch", merchRoutes);
app.use("/admin/cleanup", cleanupRoutes);
app.use("/api/forms", contactRoutes);

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
  mongoose.connection.close();
  process.exit(0);
});

// Schedule automatic cleanup - runs on the 1st of each month at 02:00
cron.schedule('0 2 1 * *', async () => {
  try {
    console.log('🧹 Running scheduled account cleanup...');
    
    // Calculate the cutoff date (30 months ago)
    const monthsInactive = parseInt(process.env.INACTIVE_MONTHS) || 30;
    const cutoffDate = new Date();
    cutoffDate.setMonth(cutoffDate.getMonth() - monthsInactive);

    console.log(`Cleaning up accounts inactive since: ${cutoffDate}`);

    // Find and delete inactive accounts
    const result = await User.deleteMany({
      lastLogin: { $lt: cutoffDate }
    });

    console.log(`✅ Cleanup completed: ${result.deletedCount} inactive accounts deleted`);
  } catch (error) {
    console.error('❌ Scheduled cleanup failed:', error);
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🧹 Scheduled cleanup: 1st of each month at 02:00 (${process.env.INACTIVE_MONTHS || 30} months inactive)`);
});
