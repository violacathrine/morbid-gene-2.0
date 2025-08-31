import { getUserFromSession } from "../utils/session.js";

export default async function authMiddleware(req, res, next) {
  try {
    // Get session ID from httpOnly cookie
    const sessionId = req.cookies?.sessionId;
    
    if (!sessionId) {
      return res.status(401).json({ message: "No session provided" });
    }

    // Get user from session
    const user = await getUserFromSession(sessionId);
    
    if (!user) {
      return res.status(401).json({ message: "Invalid or expired session" });
    }

    // Attach user ID to request
    req.userId = user._id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Authentication failed" });
  }
}
