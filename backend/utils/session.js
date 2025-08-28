import crypto from 'crypto';
import Session from '../models/Session.js';

// Generate a secure random session ID
export const generateSessionId = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Create a new session
export const createSession = async (userId) => {
  const sessionId = generateSessionId();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  const session = new Session({
    sessionId,
    userId,
    expiresAt
  });

  await session.save();
  return sessionId;
};

// Get user ID from session
export const getUserFromSession = async (sessionId) => {
  if (!sessionId) return null;

  const session = await Session.findOne({ 
    sessionId, 
    expiresAt: { $gt: new Date() } 
  }).populate('userId');

  if (!session) return null;

  // Update expiration time (sliding sessions)
  session.expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
  await session.save();

  return session.userId;
};

// Delete session (logout)
export const deleteSession = async (sessionId) => {
  if (!sessionId) return;
  await Session.deleteOne({ sessionId });
};

// Clean up expired sessions (optional, MongoDB does this automatically)
export const cleanupExpiredSessions = async () => {
  await Session.deleteMany({ expiresAt: { $lt: new Date() } });
};