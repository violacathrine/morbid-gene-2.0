import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Cleanup inactive accounts
router.post("/inactive-accounts", async (req, res) => {
  try {
    // Calculate the cutoff date (default: 30 months ago)
    const monthsInactive = parseInt(process.env.INACTIVE_MONTHS) || 30;
    const cutoffDate = new Date();
    cutoffDate.setMonth(cutoffDate.getMonth() - monthsInactive);

    console.log(`Cleaning up accounts inactive since: ${cutoffDate}`);

    // Find inactive accounts
    const inactiveUsers = await User.find({
      lastLogin: { $lt: cutoffDate }
    });

    console.log(`Found ${inactiveUsers.length} inactive accounts`);

    if (inactiveUsers.length === 0) {
      return res.json({ 
        message: "No inactive accounts found",
        deletedCount: 0,
        cutoffDate: cutoffDate
      });
    }


    const result = await User.deleteMany({
      lastLogin: { $lt: cutoffDate }
    });

    console.log(`Deleted ${result.deletedCount} inactive accounts`);

    res.json({
      message: `Successfully deleted ${result.deletedCount} inactive accounts`,
      deletedCount: result.deletedCount,
      cutoffDate: cutoffDate
    });

  } catch (error) {
    console.error('Cleanup error:', error);
    res.status(500).json({ message: "Server error during cleanup" });
  }
});

// Get statistics about account activity
router.get("/account-stats", async (req, res) => {
  try {
    const monthsInactive = parseInt(process.env.INACTIVE_MONTHS) || 30;
    const cutoffDate = new Date();
    cutoffDate.setMonth(cutoffDate.getMonth() - monthsInactive);

    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({
      lastLogin: { $gte: cutoffDate }
    });
    const inactiveUsers = totalUsers - activeUsers;

    res.json({
      totalUsers,
      activeUsers,
      inactiveUsers,
      inactiveThresholdMonths: monthsInactive,
      cutoffDate: cutoffDate
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ message: "Server error fetching stats" });
  }
});

export default router;