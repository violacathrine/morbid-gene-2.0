import express from "express";
import authMiddleware from "../middleware/auth.js";
import User from "../models/User.js";


const router = express.Router();

// Protected route: only accessible with a valid token
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    // req.userId is set in authMiddleware
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
