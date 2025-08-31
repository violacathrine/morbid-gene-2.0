import crypto from 'crypto';
import Session from '../models/Session.js';

export const generateSessionId = () => {
  return crypto.randomBytes(32).toString('hex');
};

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

export const deleteSession = async (sessionId) => {
  if (!sessionId) return;
  await Session.deleteOne({ sessionId });
};

export const cleanupExpiredSessions = async () => {
  await Session.deleteMany({ expiresAt: { $lt: new Date() } });
};