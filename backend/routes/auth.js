import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import authMiddleware from "../middleware/auth.js";
import { createSession, getUserFromSession, deleteSession } from "../utils/session.js";
import { getCookieConfig, getClearCookieConfig } from "../utils/cookieConfig.js";

const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Validation
    if (!email || !password || !name) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user (password will be hashed by middleware)
    const newUser = new User({ email, password, name });
    await newUser.save();

    // Create session
    const sessionId = await createSession(newUser._id);

    // Set httpOnly cookie
    res.cookie('sessionId', sessionId, getCookieConfig());

    res.status(201).json({ 
      user: {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name,
        createdAt: newUser.createdAt
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Login an existing user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Account not found. It may have been deleted due to inactivity. You can create a new account with this email." });
    }

    // Compare passwords using the schema method
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Update last login timestamp
    user.lastLogin = new Date();
    await user.save();

    // Create session
    const sessionId = await createSession(user._id);

    // Set httpOnly cookie
    res.cookie('sessionId', sessionId, getCookieConfig());

    res.json({ 
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Logout user
router.post("/logout", async (req, res) => {
  try {
    const sessionId = req.cookies.sessionId;
    if (sessionId) {
      await deleteSession(sessionId);
    }
    
    res.clearCookie('sessionId', getClearCookieConfig());
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get current user
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      id: user._id,
      email: user.email,
      name: user.name,
      favoritesCount: user.favorites.length,
      createdAt: user.createdAt,
      lastLogin: user.lastLogin
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Add product to favorites
router.post("/favorites", authMiddleware, async (req, res) => {
  try {
    const { sellableId, name, productTypeName, price, previewImage } = req.body;
    
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if already in favorites
    const existingFavorite = user.favorites.find(
      fav => fav.sellableId === sellableId
    );
    
    if (existingFavorite) {
      return res.status(400).json({ message: "Product already in favorites" });
    }

    // Add to favorites
    user.favorites.push({
      sellableId,
      name,
      productTypeName,
      price,
      previewImage
    });

    await user.save();
    
    res.json({ message: "Added to favorites", favoritesCount: user.favorites.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Remove product from favorites
router.delete("/favorites/:sellableId", authMiddleware, async (req, res) => {
  try {
    const { sellableId } = req.params;
    
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove from favorites
    user.favorites = user.favorites.filter(
      fav => fav.sellableId !== sellableId
    );

    await user.save();
    
    res.json({ message: "Removed from favorites", favoritesCount: user.favorites.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get user's favorites
router.get("/favorites", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Change password
router.post("/change-password", authMiddleware, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Validation
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Current password and new password are required" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: "New password must be at least 6 characters long" });
    }

    // Find user
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify current password
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Update password (will be hashed by the pre-save middleware)
    user.password = newPassword;
    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete account
router.delete("/delete-account", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete the user
    await User.findByIdAndDelete(req.userId);

    res.json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
