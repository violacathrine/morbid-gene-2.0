import { getUserFromSession } from "../utils/session.js";
import { verifyToken } from "../utils/jwt.js";

export default async function authMiddleware(req, res, next) {
  try {
    // First, try to get JWT token from Authorization header
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const decoded = verifyToken(token);
      
      if (decoded && decoded.userId) {
        req.userId = decoded.userId;
        return next();
      }
    }
    
    // Fallback to cookie-based authentication
    const sessionId = req.cookies?.sessionId;
    
    if (!sessionId) {
      return res.status(401).json({ message: "No authentication provided" });
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
